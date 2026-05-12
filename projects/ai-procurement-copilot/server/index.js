import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import XLSX from "xlsx";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const dataDir = path.join(rootDir, "data");

const app = express();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 8 * 1024 * 1024 } });
const port = process.env.PORT || 8787;

app.use(cors());
app.use(express.json({ limit: "4mb" }));

const currency = (value) => Math.round(value || 0);

async function readJson(fileName) {
  const text = await fs.readFile(path.join(dataDir, fileName), "utf8");
  return JSON.parse(text);
}

async function readUploadedText(file) {
  if (!file) return "";
  const name = file.originalname.toLowerCase();
  if (name.endsWith(".txt") || name.endsWith(".csv")) return file.buffer.toString("utf8");
  if (name.endsWith(".xlsx") || name.endsWith(".xls")) {
    const workbook = XLSX.read(file.buffer, { type: "buffer" });
    return workbook.SheetNames.map((sheet) => XLSX.utils.sheet_to_csv(workbook.Sheets[sheet])).join("\n");
  }
  return "";
}

const mockRfq = {
  customer_name: "Công ty An Phát Logistics",
  rfq_date: "2026-05-12",
  quotation_deadline: "2026-05-17",
  requirements: [
    {
      requested_item: "Laptop văn phòng i5 RAM 16GB SSD 512GB",
      category: "laptop",
      specification: "CPU i5, RAM 16GB, SSD 512GB, Windows bản quyền, bảo hành 3 năm",
      quantity: 20,
      unit: "cái",
      brand_required: "Dell hoặc HP",
      notes: "Ưu tiên hàng có sẵn"
    },
    {
      requested_item: "Switch mạng 24 port managed",
      category: "switch network",
      specification: "24 port gigabit, hỗ trợ VLAN, rackmount",
      quantity: 3,
      unit: "cái",
      brand_required: "Cisco",
      notes: "Dùng cho văn phòng mới"
    },
    {
      requested_item: "Microsoft 365 Business Standard",
      category: "Microsoft 365 license",
      specification: "License 1 năm cho email, Office apps, Teams",
      quantity: 50,
      unit: "user",
      brand_required: "Microsoft",
      notes: "Gia hạn theo năm"
    },
    {
      requested_item: "Máy in laser network duplex",
      category: "printer",
      specification: "In trắng đen, có mạng LAN, in hai mặt tự động",
      quantity: 2,
      unit: "cái",
      brand_required: "HP",
      notes: ""
    }
  ],
  missing_information: ["Chưa có địa chỉ giao hàng", "Chưa nêu điều kiện thanh toán"],
  summary: "RFQ yêu cầu thiết bị văn phòng và license phần mềm cho chi nhánh mới."
};

function safeJson(text) {
  try {
    return JSON.parse(text.replace(/```json|```/g, "").trim());
  } catch {
    return null;
  }
}

async function extractWithGemini(rfqText) {
  if (!process.env.GEMINI_API_KEY || !rfqText.trim()) return null;
  const prompt = `Bạn là AI Procurement Analyst.
Hãy đọc nội dung RFQ/thư mời báo giá được cung cấp và trích xuất danh sách yêu cầu mua hàng.

Trả về JSON hợp lệ theo schema:
{
  "customer_name": "",
  "rfq_date": "",
  "quotation_deadline": "",
  "requirements": [
    {
      "requested_item": "",
      "category": "",
      "specification": "",
      "quantity": 0,
      "unit": "",
      "brand_required": "",
      "notes": ""
    }
  ],
  "missing_information": [],
  "summary": ""
}

Quy tắc:
- Không bịa thông tin.
- Nếu thiếu thông tin thì để trống hoặc ghi trong missing_information.
- Chuẩn hóa tên sản phẩm nếu có thể.
- Chỉ trả JSON, không trả markdown.

Nội dung RFQ:
${rfqText.slice(0, 16000)}`;

  const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": process.env.GEMINI_API_KEY
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.2, responseMimeType: "application/json" }
    })
  });
  if (!response.ok) return null;
  const data = await response.json();
  return safeJson(data?.candidates?.[0]?.content?.parts?.[0]?.text || "");
}

function words(value) {
  return String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(/[^a-z0-9]+/).filter(Boolean);
}

function scoreProduct(requirement, product) {
  const reqText = `${requirement.requested_item} ${requirement.category} ${requirement.specification} ${requirement.brand_required}`;
  const reqWords = new Set(words(reqText));
  const productWords = new Set(words(`${product.product_name} ${product.category} ${product.brand} ${product.specs}`));
  let score = 0;
  if (words(requirement.category).some((w) => words(product.category).includes(w))) score += 35;
  if (requirement.brand_required && words(requirement.brand_required).includes(words(product.brand)[0])) score += 20;
  reqWords.forEach((word) => {
    if (productWords.has(word)) score += 5;
  });
  if (product.stock_qty >= Number(requirement.quantity || 0)) score += 15;
  else if (product.stock_qty > 0) score += 6;
  return Math.min(score, 98);
}

function pickMarket(requirement, product, marketPrices) {
  const req = words(`${requirement.requested_item} ${requirement.category} ${product.product_name}`);
  return marketPrices
    .map((item) => ({
      item,
      score: words(item.product_name).filter((word) => req.includes(word)).length
    }))
    .sort((a, b) => b.score - a.score)[0]?.item || { min_price: product.cost_price * 1.2, max_price: product.cost_price * 1.45, source: "Mock estimate", checked_date: "2026-05-12" };
}

function enrich(rfq, products, salesHistory, marketPrices) {
  const recommendations = rfq.requirements.map((requirement, index) => {
    const best = [...products].sort((a, b) => scoreProduct(requirement, b) - scoreProduct(requirement, a))[0];
    const match_score = scoreProduct(requirement, best);
    const sales = salesHistory.filter((sale) => sale.sku === best.sku).sort((a, b) => new Date(b.sold_date) - new Date(a.sold_date));
    const lastSold = sales[0];
    const market = pickMarket(requirement, best, marketPrices);
    const suggested_quote_price = currency(Math.max(best.cost_price * 1.15, lastSold?.sold_price || 0, market.min_price || 0));
    const margin = suggested_quote_price ? Math.round(((suggested_quote_price - best.cost_price) / suggested_quote_price) * 100) : 0;
    const stockRisk = best.stock_qty >= Number(requirement.quantity || 0) ? "Thấp" : best.stock_qty > 0 ? "Trung bình" : "Cao";
    return {
      line_no: index + 1,
      requirement,
      product: best,
      match_score,
      stock_qty: best.stock_qty,
      last_sold_price: lastSold?.sold_price || null,
      last_sold_date: lastSold?.sold_date || "",
      market_min_price: market.min_price,
      market_max_price: market.max_price,
      market_source: market.source,
      suggested_quote_price,
      margin_estimate: margin,
      risk_level: stockRisk,
      ai_reasoning: `Khớp theo danh mục "${requirement.category}", thông số chính và tình trạng tồn kho. ${stockRisk === "Cao" ? "Cần kiểm tra lại nguồn hàng trước khi gửi báo giá." : "Có thể dùng làm đề xuất báo giá nhanh."}`
    };
  });

  const totalEstimated = recommendations.reduce((sum, item) => sum + item.suggested_quote_price * Number(item.requirement.quantity || 0), 0);
  const goodMatches = recommendations.filter((item) => item.match_score >= 70).length;
  const lowStock = recommendations.filter((item) => item.stock_qty < Number(item.requirement.quantity || 0)).length;
  const averageMargin = Math.round(recommendations.reduce((sum, item) => sum + item.margin_estimate, 0) / recommendations.length);

  return {
    rfq_summary: {
      customer_name: rfq.customer_name || "Chưa xác định",
      rfq_date: rfq.rfq_date || new Date().toISOString().slice(0, 10),
      quotation_deadline: rfq.quotation_deadline || "",
      total_lines: rfq.requirements.length,
      ai_confidence_score: goodMatches >= rfq.requirements.length - 1 ? 89 : 76,
      total_estimated_value: totalEstimated,
      missing_information: rfq.missing_information || [],
      summary: rfq.summary || ""
    },
    requirements: rfq.requirements,
    recommendations,
    insights: {
      total_requested_products: rfq.requirements.length,
      good_matches: goodMatches,
      low_stock_items: lowStock,
      estimated_margin: `${averageMargin}%`,
      market_risk: lowStock ? "Trung bình" : "Thấp",
      suggested_vendors: [...new Set(recommendations.map((item) => item.product.supplier))].slice(0, 4)
    }
  };
}

function buildWorkbook(payload) {
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet([payload.rfq_summary]), "RFQ Summary");
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(payload.requirements), "Extracted Requirements");
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(payload.recommendations.map((item) => ({
    line_no: item.line_no,
    requested_item: item.requirement.requested_item,
    proposed_product: item.product.product_name,
    sku: item.product.sku,
    match_score: item.match_score,
    stock_qty: item.stock_qty,
    cost_price: item.product.cost_price,
    last_sold_price: item.last_sold_price,
    market_range: `${item.market_min_price} - ${item.market_max_price}`,
    suggested_quote_price: item.suggested_quote_price,
    margin_estimate: `${item.margin_estimate}%`,
    risk_level: item.risk_level,
    ai_reasoning: item.ai_reasoning
  }))), "AI Recommendations");
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(payload.recommendations.map((item) => ({
    No: item.line_no,
    "Requested Item": item.requirement.requested_item,
    "Proposed Product": item.product.product_name,
    SKU: item.product.sku,
    Specification: item.product.specs,
    Quantity: item.requirement.quantity,
    "Unit Price": item.suggested_quote_price,
    "Total Price": item.suggested_quote_price * Number(item.requirement.quantity || 0),
    Warranty: item.product.warranty,
    Notes: item.risk_level === "Cao" ? "Cần xác nhận tồn kho" : "Đề xuất bởi AI Procurement Copilot"
  }))), "Quotation Draft");
  return XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
}

app.post("/api/analyze-rfq", upload.single("file"), async (req, res) => {
  try {
    const [products, salesHistory, marketPrices] = await Promise.all([
      readJson("products.json"),
      readJson("sales_history.json"),
      readJson("market_prices.json")
    ]);
    const uploadedText = await readUploadedText(req.file);
    const extracted = await extractWithGemini(uploadedText).catch(() => null);
    const payload = enrich(extracted || mockRfq, products, salesHistory, marketPrices);
    res.json({ source: extracted ? "gemini" : "mock", file_name: req.file?.originalname || "sample-rfq.txt", ...payload });
  } catch (error) {
    res.status(500).json({ error: "Không thể phân tích RFQ", detail: error.message });
  }
});

app.post("/api/export-quotation", (req, res) => {
  try {
    const buffer = buildWorkbook(req.body);
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", "attachment; filename=quotation-draft.xlsx");
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ error: "Không thể xuất Excel", detail: error.message });
  }
});

app.listen(port, () => {
  console.log(`AI Procurement Copilot API running at http://127.0.0.1:${port}`);
});
