import { useState } from "react";
import * as XLSX from "xlsx";

const zaloCommunityUrl = "https://zalo.me/g/sf1nek4pce9gkmvz5cos";

const sampleResult = {
  fileName: "Bang-giao-dich-mau-06-2026.pdf",
  fileMeta: "3 trang · bảng giao dịch mẫu · xuất XLSX trong vài giây",
  summary:
    "Lumi đã biến một file PDF mẫu thành bảng Excel có thể kiểm tra, copy và gửi cho kế toán/vận hành.",
  columns: ["Ngày", "Mã giao dịch", "Nội dung", "Thu", "Chi", "Số dư", "Trạng thái"],
  rows: [
    ["03/06/2026", "GD-0603-01", "Thu tiền khách hàng A", "18.500.000", "", "128.500.000", "Rõ"],
    ["04/06/2026", "GD-0604-02", "Phí dịch vụ", "", "2.300.000", "126.200.000", "Rõ"],
    ["05/06/2026", "GD-0605-03", "Thanh toán nhà cung cấp", "", "12.000.000", "114.200.000", "Rõ"],
    ["07/06/2026", "GD-0607-04", "Thu COD tuần 1", "9.850.000", "", "124.050.000", "Rõ"],
    ["10/06/2026", "GD-0610-05", "Phí duy trì tài khoản", "", "55.000", "123.995.000", "Rõ"],
    ["12/06/2026", "GD-0612-06", "Chuyển khoản nội bộ", "", "5.000.000", "118.995.000", "Cần kiểm tra"],
    ["15/06/2026", "GD-0615-07", "Thu tiền khách hàng B", "24.000.000", "", "142.995.000", "Rõ"],
    ["18/06/2026", "GD-0618-08", "Thanh toán hóa đơn", "", "3.480.000", "139.515.000", "Cần kiểm tra"],
  ],
};

const samplePreviewRows = sampleResult.rows.slice(0, 4);

const industryExamples = [
  {
    icon: "🏦",
    role: "Tài chính / ngân hàng",
    file: "Sao kê, bảng giao dịch, báo cáo phí, bảng đối soát",
    result: "Ra bảng Excel để kiểm tra dòng tiền và số liệu lệch.",
  },
  {
    icon: "👥",
    role: "HR",
    file: "Danh sách ứng viên, bảng chấm công, bảng phụ cấp",
    result: "Ra bảng để lọc, kiểm tra và gửi lại cho team.",
  },
  {
    icon: "🧾",
    role: "Kế toán",
    file: "Sao kê, bảng phí, hóa đơn, file đối soát",
    result: "Ra Excel để kiểm tra số tiền và dòng cần xem lại.",
  },
  {
    icon: "📦",
    role: "Sales / Admin",
    file: "Báo giá, đơn hàng, danh sách khách, bảng giao nhận",
    result: "Ra bảng gọn để copy, gửi tiếp hoặc nhập hệ thống.",
  },
  {
    icon: "🏢",
    role: "Manager",
    file: "Báo cáo PDF, danh sách chi phí, bảng tổng hợp",
    result: "Nhìn nhanh số liệu chính trước khi ra quyết định.",
  },
];

function buildWorkbook() {
  const workbook = XLSX.utils.book_new();
  const sheet = XLSX.utils.aoa_to_sheet([sampleResult.columns, ...sampleResult.rows]);
  XLSX.utils.book_append_sheet(workbook, sheet, "Du lieu mau");
  const summary = XLSX.utils.json_to_sheet([
    { "Mục": "File mẫu", "Giá trị": sampleResult.fileName },
    { "Mục": "Kết quả", "Giá trị": sampleResult.summary },
    { "Mục": "Dòng cần kiểm tra", "Giá trị": "2" },
  ]);
  XLSX.utils.book_append_sheet(workbook, summary, "Tom tat");
  XLSX.writeFile(workbook, "Lumi-PDF-to-Excel-demo.xlsx");
}

export default function PdfExcelAISection() {
  const [copied, setCopied] = useState(false);

  const copyTable = async () => {
    const text = [sampleResult.columns.join("\t"), ...sampleResult.rows.map((row) => row.join("\t"))].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="pdf-excel-section">
      <div className="pdf-excel-shell">
        <header className="pdf-excel-hero" data-reveal>
          <div className="pdf-excel-hero-copy">
            <span className="caption-badge">MVP mẫu · Data AI cho doanh nghiệp</span>
            <h1>Chuyển PDF thành Excel bằng AI</h1>
            <p>
              Đỡ phải ngồi gõ lại từng dòng từ PDF. Nhìn thử cách Lumi đọc một file có bảng,
              tách dòng/cột và tạo ra bảng Excel dùng được ngay.
            </p>
            <div className="pdf-excel-before-after" aria-label="So sánh trước và sau khi dùng PDF to Excel AI">
              <span><b>Trước</b> Nhìn PDF rồi nhập tay từng dòng</span>
              <i aria-hidden="true">→</i>
              <span><b>Sau</b> Có bảng Excel để kiểm tra và tải về</span>
            </div>
            <p className="pdf-excel-trust-note">
              Lumi đánh dấu dòng chưa chắc để bạn kiểm tra lại trước khi dùng.
            </p>
            <div className="pdf-excel-hero-actions">
              <a href="#sample-table">Xem bảng Excel đầu ra</a>
              <button className="ghost" type="button" onClick={buildWorkbook}>
                Tải XLSX mẫu
              </button>
            </div>
          </div>

          <div className="pdf-excel-hero-visual" aria-label="Mô phỏng PDF được Lumi chuyển thành Excel">
            <div className="pdf-mini-card pdf-mini-pdf">
              <div className="pdf-mini-head">
                <span>PDF</span>
                <b>3 trang</b>
              </div>
              <div className="pdf-mini-lines">
                <i />
                <i />
                <i />
                <i />
              </div>
              <div className="pdf-mini-table">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className="pdf-transform-core">
              <img src="/lumi-bot.png" alt="Lumi Bot" />
              <strong>Lumi bóc bảng</strong>
              <small>Tách cột · giữ số tiền · đánh dấu dòng cần xem lại</small>
            </div>

            <div className="pdf-mini-card pdf-mini-excel">
              <div className="pdf-mini-head">
                <span>XLSX</span>
                <b>8 dòng</b>
              </div>
              <div className="excel-mini-grid">
                <b>Ngày</b>
                <b>Nội dung</b>
                <b>Chi</b>
                {samplePreviewRows.map((row) => (
                  <span key={row[1]} className={row.at(-1) === "Cần kiểm tra" ? "review" : ""}>
                    <em>{row[0]}</em>
                    <em>{row[2]}</em>
                    <em>{row[4] || row[3]}</em>
                  </span>
                ))}
              </div>
            </div>

            <div className="pdf-excel-proof-chip">
              <b>Đầu ra:</b> Excel có thể tải, copy và kiểm tra
            </div>
          </div>
        </header>

        <section className="pdf-excel-industries" data-reveal aria-label="Các loại file có thể thử với PDF to Excel AI">
          <div className="pdf-excel-industries-head">
            <span>File nào có bảng đều đáng thử</span>
            <h2>Tài chính, ngân hàng, kế toán, HR, sales, admin đều có thể dùng.</h2>
          </div>
          <div className="pdf-excel-industries-grid">
            {industryExamples.map((item) => (
              <article key={item.role}>
                <b>{item.icon}</b>
                <small>{item.role}</small>
                <strong>{item.file}</strong>
                <p>{item.result}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="pdf-excel-flow" data-reveal>
          <article>
            <span>1</span>
            <strong>PDF có bảng</strong>
            <p>Ví dụ: bảng giao dịch, bảng phí, danh sách đối soát.</p>
          </article>
          <article>
            <span>2</span>
            <strong>Lumi bóc dữ liệu</strong>
            <p>Tách cột, tách dòng, đánh dấu chỗ cần kiểm tra.</p>
          </article>
          <article>
            <span>3</span>
            <strong>Xuất XLSX</strong>
            <p>Nhận file Excel để kiểm tra, gửi tiếp hoặc nhập vào quy trình nội bộ.</p>
          </article>
        </div>

        <section id="sample-table" className="pdf-excel-card pdf-excel-showcase" data-reveal>
          <div className="pdf-excel-sample-head">
            <div className="pdf-excel-file-preview" aria-hidden="true">
              <span />
              <i />
              <i />
              <i />
            </div>
            <div>
              <small>File mẫu</small>
              <h2>{sampleResult.fileName}</h2>
              <p>{sampleResult.fileMeta}</p>
            </div>
            <b>Demo an toàn</b>
          </div>

          <div className="pdf-excel-value-card">
            <img src="/lumi-bot.png" alt="" />
            <div>
              <small>Lumi nói ngắn gọn</small>
              <strong>{sampleResult.summary}</strong>
            </div>
          </div>

          <div className="pdf-excel-stats">
            <span><small>Số dòng</small><b>8</b></span>
            <span><small>Cần kiểm tra</small><b>2</b></span>
            <span><small>Đầu ra</small><b>XLSX</b></span>
            <span><small>Mục tiêu</small><b>Giảm nhập liệu</b></span>
          </div>

          <div className="pdf-excel-table-wrap">
            <table className="pdf-excel-table">
              <thead>
                <tr>{sampleResult.columns.map((column) => <th key={column}>{column}</th>)}</tr>
              </thead>
              <tbody>
                {sampleResult.rows.map((row) => (
                  <tr key={row[1]} className={row.at(-1) === "Cần kiểm tra" ? "needs-review" : ""}>
                    {row.map((cell, index) => <td key={`${row[1]}-${index}`}>{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pdf-excel-checks">
            <span>✓ Dòng chưa chắc được tô vàng, không giấu sai số.</span>
            <span>✓ Người dùng kiểm tra trước khi xuất file.</span>
            <span>✓ Phù hợp làm pilot riêng cho từng quy trình.</span>
          </div>

          <div className="pdf-excel-actions">
            <button type="button" onClick={buildWorkbook}>Tải XLSX mẫu</button>
            <button type="button" onClick={copyTable}>{copied ? "Đã copy" : "Copy bảng"}</button>
            <a href={zaloCommunityUrl} target="_blank" rel="noreferrer">Gửi file để Lumi tư vấn cách xử lý</a>
          </div>
        </section>
      </div>
    </section>
  );
}
