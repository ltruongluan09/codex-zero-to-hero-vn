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
          <span className="caption-badge">MVP mẫu · Data AI cho doanh nghiệp</span>
          <h1>Chuyển PDF thành Excel bằng AI</h1>
          <p>
            Đây là bản demo mẫu để bạn thấy Lumi có thể biến tài liệu có bảng thành dữ liệu dùng được.
            File thật sẽ được thử trong luồng riêng để đảm bảo bảo mật và độ chính xác.
          </p>
          <div className="pdf-excel-hero-actions">
            <a href="#sample-table">Xem bảng mẫu</a>
            <a className="ghost" href={zaloCommunityUrl} target="_blank" rel="noreferrer">
              Trao đổi file thật
            </a>
          </div>
        </header>

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
            <a href={zaloCommunityUrl} target="_blank" rel="noreferrer">Muốn thử file thật?</a>
          </div>
        </section>
      </div>
    </section>
  );
}
