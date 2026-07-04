# SiteFlow Demo — Tài liệu Requirement cho Codex

> Phiên bản: 1.0 — Ngày tạo: 04/07/2026
> Vai trò: PM + Solution Architect + QA (bạn) | Dev: Codex
> Mục tiêu: Demo bán hàng, KHÔNG phải sản phẩm hoàn chỉnh

---

## 0. Tên demo được chọn: **SiteFlow Demo**

Lý do chọn:
- Trung tính, không gợi nhớ FastWork/FastCons.
- Nghe "SaaS hiện đại", dễ liên tưởng đến quản lý dòng công việc công trình.
- Ngắn, dễ đọc, dễ đưa vào URL: `/construction-demo`.

Trong toàn bộ code, text UI, tiêu đề trang: dùng tên hiển thị **"SiteFlow"**. Không dùng chữ "FastWork/FastCons" ở bất kỳ đâu.

---

## 1. Product Positioning

**Demo tên gì?**
SiteFlow Demo — Ứng dụng quản lý công trình xây dựng.

**Một câu mô tả demo:**
SiteFlow là nền tảng giúp nhà thầu và ban quản lý dự án theo dõi tiến độ công trình, công việc hằng ngày và nhật ký hiện trường theo thời gian thực, ngay trên điện thoại hoặc máy tính.

**Demo này giải quyết vấn đề gì?**
- Chủ đầu tư/quản lý không biết công trình đang tiến độ thế nào nếu không ra hiện trường.
- Nhân sự hiện trường ghi chép thủ công (giấy, Zalo, Excel) → dễ thất lạc, không tổng hợp được.
- Công việc trễ hạn không được cảnh báo kịp thời.
- Không có nơi lưu trữ tập trung ảnh + ghi chú hiện trường theo từng công trình.

**Ai là người dùng chính?**
1. **Quản lý/Chủ đầu tư (Desktop)** — xem dashboard tổng quan, theo dõi tiến độ, nhận cảnh báo trễ.
2. **Nhân sự hiện trường/Giám sát công trình (Mobile)** — cập nhật nhật ký hiện trường bằng ảnh + ghi chú ngay tại chỗ.

---

## 2. Demo Story (60–90 giây) — Kịch bản click cho khách

**Mở màn (5s):**
> "Đây là SiteFlow — một bản demo em dựng nhanh để anh/chị hình dung được sản phẩm quản lý công trình sẽ vận hành như thế nào. Dữ liệu trong demo là dữ liệu mẫu để minh họa."

**Bước 1 — Dashboard (15s):**
Click vào `/construction-demo` (Dashboard).
> "Đây là màn hình quản lý sẽ mở ra mỗi sáng: 4 công trình đang chạy, tổng số công việc hôm nay, và ngay lập tức thấy có bao nhiêu việc đang trễ hạn — không cần gọi điện hỏi ai."
Trỏ vào khối cảnh báo trễ.
> "Hệ thống tự động cảnh báo đỏ nếu công việc quá hạn mà chưa hoàn thành."

**Bước 2 — Danh sách công trình (15s):**
Click "Công trình" trên sidebar.
> "Đây là danh sách toàn bộ công trình đang quản lý — tiến độ %, người phụ trách, địa điểm, trạng thái. Anh/chị có thể lọc theo trạng thái hoặc tìm nhanh theo tên."

**Bước 3 — Chi tiết công trình (15s):**
Click vào 1 công trình (ví dụ "Chung cư The Sun Riverside").
> "Vào chi tiết, mình thấy đầy đủ thông tin công trình, danh sách công việc, tiến độ theo mốc thời gian, và nhật ký hiện trường gần nhất — tất cả trong một màn hình."

**Bước 4 — Nhật ký hiện trường (15s):**
Click tab "Nhật ký hiện trường".
> "Đây là nơi lưu lại toàn bộ hình ảnh, ghi chú hiện trường theo từng ngày — giống như một cuốn nhật ký thi công có ảnh minh chứng, tra cứu lại rất nhanh."

**Bước 5 — Mobile form thêm nhật ký (15s):**
Mở trên điện thoại (hoặc thu nhỏ trình duyệt), click "Thêm nhật ký".
> "Và đây là phần quan trọng nhất: nhân sự ngoài công trường chỉ cần vài thao tác trên điện thoại — chụp ảnh, ghi chú, chọn công việc liên quan — là xong, không cần về văn phòng nhập liệu."
Bấm gửi → hiện toast "Gửi nhật ký thành công".

**Kết thúc — câu hỏi kéo requirement (10s):**
> "Đây mới là bản demo với dữ liệu mẫu để anh/chị hình dung luồng vận hành. Anh/chị đang quản lý bao nhiêu công trình cùng lúc, và hiện tại đội hiện trường đang báo cáo tiến độ bằng cách nào — Zalo, Excel hay giấy tờ? Dựa vào đó em sẽ tư vấn phần nào cần custom thêm cho đúng quy trình của công ty mình."

---

## 3. Information Architecture

**Sidebar / Menu (Desktop):**
```
SiteFlow
├── 📊 Dashboard            → /construction-demo
├── 🏗️ Công trình           → /construction-demo/projects
│     └── Chi tiết công trình → /construction-demo/projects/:id
│           ├── Tab: Tổng quan
│           ├── Tab: Công việc
│           └── Tab: Nhật ký hiện trường
├── 📝 Nhật ký hiện trường  → /construction-demo/logs
└── ⚙️ (icon, disabled)     Cài đặt — không cần làm, chỉ để UI đầy đủ
```

**Mobile (bottom nav, chỉ áp dụng cho flow nhân sự hiện trường):**
```
[Trang chủ] [Nhật ký] [+ Thêm] [Cá nhân]
```
Trong demo chỉ cần làm thật nút **"+ Thêm"** dẫn tới form thêm nhật ký (`/construction-demo/logs/new`). Các nút khác có thể là placeholder không cần chức năng.

**Route đề xuất:**
| Route | Màn hình |
|---|---|
| `/construction-demo` | Dashboard tổng quan |
| `/construction-demo/projects` | Danh sách công trình |
| `/construction-demo/projects/:id` | Chi tiết công trình |
| `/construction-demo/logs` | Nhật ký hiện trường (toàn bộ) |
| `/construction-demo/logs/new` | Form thêm nhật ký (mobile-first) |

**Cấu trúc thư mục/component đề xuất (React):**
```
/construction-demo
├── layout/
│   ├── DashboardLayout.jsx      (sidebar + topbar, dùng cho desktop screens)
│   └── MobileLayout.jsx         (header đơn giản + bottom nav)
├── pages/
│   ├── DashboardPage.jsx
│   ├── ProjectListPage.jsx
│   ├── ProjectDetailPage.jsx
│   └── SiteLogListPage.jsx
│   └── SiteLogFormPage.jsx
├── components/
│   ├── StatCard.jsx
│   ├── ProjectCard.jsx
│   ├── ProjectTable.jsx
│   ├── ProgressBar.jsx
│   ├── StatusBadge.jsx
│   ├── AlertItem.jsx
│   ├── TaskListItem.jsx
│   ├── SiteLogCard.jsx
│   ├── SiteLogForm.jsx
│   └── EmptyState.jsx
├── data/
│   └── mockData.js               (toàn bộ fake data — xem mục 5)
└── DEMO_SCOPE.md                 (chính là file này)
```

Toàn bộ state là **local state trong React (useState/useContext)**, không gọi API thật, không kết nối database.

---

## 4. Screen Requirements chi tiết

### 4.1. Dashboard tổng quan (`/construction-demo`)

**Mục tiêu màn hình:** Cho quản lý cái nhìn tổng quan trong 5 giây: đang có bao nhiêu công trình, việc hôm nay, việc trễ.

**Layout Desktop:**
- Topbar: Logo "SiteFlow", tên người dùng giả lập "Nguyễn Văn An — Quản lý dự án", avatar tròn.
- Hàng 4 Stat Card ngang: "Công trình đang thi công" (4), "Công việc hôm nay" (12), "Công việc trễ hạn" (4, màu đỏ), "Nhân sự hiện trường" (5).
- Khối bên trái (2/3 width): Bảng "Tiến độ các công trình" — mini progress bar cho từng công trình + % hoàn thành.
- Khối bên phải (1/3 width): "Cảnh báo cần chú ý" — list 4 cảnh báo, mỗi item có icon chuông đỏ, tên công trình, nội dung cảnh báo, mức độ (Cao/Trung bình).
- Bên dưới: "Nhật ký hiện trường gần đây" — 3 card nhật ký mới nhất (ảnh thumbnail + tên công trình + thời gian).

**Layout Mobile:** Stat card xếp 2x2, các khối xếp dọc, ẩn bảng chi tiết dài — chỉ hiện top 3 công trình.

**Component cần có:** StatCard, ProjectProgressRow, AlertItem, SiteLogCard (thumbnail nhỏ).

**Nội dung text tiếng Việt:** dùng đúng nhãn:
- "Công trình đang thi công", "Công việc hôm nay", "Công việc trễ hạn", "Nhân sự hiện trường"
- "Tiến độ các công trình", "Xem tất cả →"
- "Cảnh báo cần chú ý"
- "Nhật ký hiện trường gần đây"

**Fake data:** dùng dữ liệu ở mục 5, tính toán số liệu thống kê từ chính data đó (không hard-code số riêng biệt) để đảm bảo nhất quán.

**Empty/loading state:** Loading: hiện skeleton card 4 ô khi mount (dùng `setTimeout` giả lập 500ms). Không cần empty state vì luôn có data mẫu.

**Interaction/click behavior:**
- Click "Xem tất cả →" ở bảng tiến độ → chuyển tới `/construction-demo/projects`.
- Click 1 dòng công trình → chuyển tới `/construction-demo/projects/:id`.
- Click 1 cảnh báo → chuyển tới chi tiết công trình liên quan.
- Click 1 site-log card → chuyển tới `/construction-demo/logs`.

**Điều gì là fake/local state:** toàn bộ số liệu tính từ mockData.js, không có realtime.

**Không làm ở bản demo:** không có filter theo ngày, không có export báo cáo, không có thông báo đẩy thật.

---

### 4.2. Danh sách công trình (`/construction-demo/projects`)

**Mục tiêu màn hình:** Xem toàn bộ công trình, lọc nhanh, vào chi tiết.

**Layout Desktop:** Thanh trên cùng gồm ô tìm kiếm ("Tìm công trình...") + dropdown lọc trạng thái (Tất cả / Đang thi công / Tạm dừng / Hoàn thành). Bên dưới là dạng **card grid 2 cột** (không dùng bảng dày đặc, giữ phong cách premium): mỗi card gồm ảnh đại diện công trình, tên, địa chỉ, badge trạng thái, thanh tiến độ %, tên người phụ trách + avatar, số công việc trễ (nếu có, hiện badge đỏ nhỏ).

**Layout Mobile:** Card grid chuyển thành 1 cột, thu gọn thông tin (ẩn ảnh đại diện lớn, chỉ giữ icon nhỏ).

**Component:** SearchBar, StatusFilterDropdown, ProjectCard, StatusBadge.

**Nội dung text tiếng Việt:**
- Placeholder tìm kiếm: "Tìm theo tên công trình hoặc địa chỉ..."
- Filter options: "Tất cả", "Đang thi công", "Tạm dừng", "Hoàn thành"
- Trên card: "Phụ trách:", "Tiến độ", "việc trễ"

**Fake data:** 4 công trình (mục 5.1).

**Empty state:** Nếu search không ra kết quả → hiện EmptyState với icon và text "Không tìm thấy công trình phù hợp."

**Interaction:** Gõ vào ô tìm kiếm lọc real-time theo tên (client-side filter trên mảng có sẵn). Click card → `/construction-demo/projects/:id`.

**Không làm:** không có nút "Thêm công trình mới" hoạt động thật (có thể có nút nhưng click ra toast "Tính năng sẽ có ở bản đầy đủ" — tùy chọn, không bắt buộc).

---

### 4.3. Chi tiết công trình (`/construction-demo/projects/:id`)

**Mục tiêu màn hình:** Xem toàn bộ thông tin 1 công trình: tổng quan, công việc, nhật ký.

**Layout Desktop:**
- Header: tên công trình, địa chỉ, badge trạng thái, nút "← Quay lại".
- 3 Tabs: "Tổng quan" | "Công việc" | "Nhật ký hiện trường".
- Tab Tổng quan: thông tin công trình (chủ đầu tư, ngày khởi công, ngày dự kiến hoàn thành, người phụ trách, tiến độ tổng %), thanh tiến độ lớn, mini-stat (số công việc hoàn thành/tổng, số nhật ký đã ghi).
- Tab Công việc: list công việc dạng bảng/list — tên việc, người phụ trách, hạn chót, trạng thái (badge: Chưa bắt đầu / Đang làm / Hoàn thành / Trễ hạn).
- Tab Nhật ký hiện trường: grid card nhật ký (ảnh + ngày + người ghi + ghi chú ngắn), có nút "+ Thêm nhật ký" góc phải trên.

**Layout Mobile:** Tabs chuyển thành segmented control cuộn ngang; nội dung xếp dọc full width.

**Component:** Tabs, InfoRow, ProgressBar, TaskListItem, StatusBadge, SiteLogCard, FAB "+ Thêm nhật ký" (mobile).

**Nội dung text tiếng Việt:** "Chủ đầu tư", "Khởi công", "Dự kiến hoàn thành", "Người phụ trách", "Tiến độ tổng thể", "Công việc", "Nhật ký hiện trường", "+ Thêm nhật ký".

**Fake data:** map theo `projectId` để lấy đúng công việc (mục 5.2) và nhật ký (mục 5.3) thuộc công trình đó.

**Empty state:** Nếu công trình chưa có nhật ký nào → EmptyState "Chưa có nhật ký hiện trường nào cho công trình này."

**Interaction:** Click tab chuyển nội dung (không đổi URL, dùng state). Click "+ Thêm nhật ký" → chuyển `/construction-demo/logs/new?projectId=:id`. Click 1 task → mở modal nhỏ xem chi tiết (tùy chọn, không bắt buộc — có thể bỏ nếu thiếu thời gian).

**Không làm:** không sửa/xóa công việc, không thêm công trình mới, không sửa thông tin công trình.

---

### 4.4. Nhật ký hiện trường (`/construction-demo/logs`)

**Mục tiêu màn hình:** Xem toàn bộ nhật ký hiện trường của tất cả công trình, dạng feed giống "activity log".

**Layout Desktop:** Bộ lọc trên cùng: dropdown chọn công trình ("Tất cả công trình" hoặc chọn 1 trong 4), input ngày (tùy chọn, có thể bỏ nếu không kịp). Danh sách nhật ký dạng **timeline/feed dọc**: mỗi item có avatar người ghi, tên công trình, thời gian, ảnh hiện trường (1 ảnh chính, có thể thêm 2-3 ảnh nhỏ), nội dung ghi chú, tag công việc liên quan (badge nhỏ).

**Layout Mobile:** Giữ nguyên dạng feed dọc, full width, ảnh full width phía trên ghi chú (giống Instagram feed đơn giản).

**Component:** FilterBar, SiteLogFeedItem, ImageGallery (đơn giản, chỉ cần hiển thị ảnh placeholder), TagBadge.

**Nội dung text tiếng Việt:** "Tất cả công trình", "Lọc theo công trình", "đã ghi nhật ký tại", "Công việc liên quan:".

**Fake data:** 8 nhật ký hiện trường (mục 5.3), dùng ảnh placeholder (xem ghi chú ảnh bên dưới).

**Ghi chú về ảnh:** Vì không có backend upload thật, dùng ảnh placeholder từ dịch vụ public (ví dụ `https://images.unsplash.com/...` với từ khóa "construction site", "building construction") hoặc ảnh SVG/placeholder màu xám có icon công trình nếu không có mạng — Codex tự chọn nguồn ảnh miễn là hiển thị đẹp và load nhanh, không cần ảnh thật của khách.

**Empty state:** Nếu filter theo công trình mà công trình đó không có log → EmptyState.

**Interaction:** Đổi filter → lọc client-side. Click "+ Thêm nhật ký" (nút nổi góc phải dưới, dạng FAB) → `/construction-demo/logs/new`.

**Không làm:** không có comment/like trên nhật ký, không có realtime cập nhật.

---

### 4.5. Form thêm nhật ký hiện trường (Mobile) (`/construction-demo/logs/new`)

**Mục tiêu màn hình:** Mô phỏng trải nghiệm nhân sự hiện trường nhập nhật ký nhanh, 1 tay thao tác, mobile-first.

**Layout Mobile (ưu tiên, đây là màn hình chính cho mobile):**
- Header đơn giản: nút "←", tiêu đề "Thêm nhật ký hiện trường".
- Form theo chiều dọc, input to, dễ bấm:
  1. Dropdown "Chọn công trình" (bắt buộc) — mặc định chọn theo `projectId` nếu có trên URL.
  2. Khu vực "Thêm ảnh hiện trường" — ô vuông dashed border với icon camera + text "Chụp ảnh hoặc chọn từ thư viện". Click vào sẽ **giả lập** thêm 1 ảnh placeholder ngẫu nhiên vào danh sách preview (không cần upload thật, không bắt buộc phải chọn ảnh thật từ máy — xem mục "Không làm").
  3. Textarea "Ghi chú hiện trường" placeholder: "Mô tả tình hình thi công hôm nay..."
  4. Dropdown "Công việc liên quan" (tùy chọn) — lấy từ danh sách công việc của công trình đã chọn.
  5. Nút lớn full-width "Gửi nhật ký" (màu chủ đạo, bo góc, dễ bấm bằng ngón cái).

**Layout Desktop:** Form căn giữa màn hình, max-width ~480px, giữ nguyên cấu trúc mobile (vì đây vốn là mobile-first flow, desktop chỉ cần hiển thị đúng, không cần tối ưu riêng).

**Component:** SelectDropdown, PhotoUploadMock, Textarea, Button (primary, full-width), Toast/SuccessModal.

**Nội dung text tiếng Việt:**
- Tiêu đề: "Thêm nhật ký hiện trường"
- "Chọn công trình", "Thêm ảnh hiện trường", "Chụp ảnh hoặc chọn từ thư viện", "Ghi chú hiện trường", "Công việc liên quan (không bắt buộc)", "Gửi nhật ký"
- Toast thành công: "✅ Đã gửi nhật ký hiện trường thành công!"

**Fake data:** danh sách công trình + công việc lấy từ mockData.

**Empty/loading state:** Khi bấm "Gửi nhật ký" → hiện trạng thái loading trên nút (spinner + text "Đang gửi...") trong ~800ms giả lập, sau đó show toast/modal thành công.

**Interaction/click behavior:**
- Bấm khu vực ảnh → thêm ảnh placeholder vào preview grid (tối đa cho thêm 3-4 ảnh, có nút "x" để xóa từng ảnh khỏi preview).
- Validate đơn giản: bắt buộc chọn công trình + có ít nhất 1 ảnh HOẶC có ghi chú (không bắt buộc cả 2, để tránh block demo). Nếu thiếu → hiện inline error nhỏ màu đỏ.
- Bấm "Gửi nhật ký" hợp lệ → loading → toast thành công → tự động điều hướng về `/construction-demo/logs` sau ~1.5s, và nhật ký mới **được thêm vào đầu danh sách state** (dùng React state ở cấp cao hơn hoặc Context) để cảm giác thật.

**Điều gì là fake/local state:** ảnh là placeholder ngẫu nhiên, không đọc file thật từ máy (trừ khi Codex muốn làm thêm input file thật để preview ảnh người dùng chọn — đây là điểm cộng nhưng KHÔNG bắt buộc).

**Không làm ở bản demo:**
- Không bắt buộc phải tích hợp camera thật của thiết bị.
- Không lưu ảnh thật lên server (vì không có backend).
- Không có nhiều bước wizard — chỉ 1 màn hình form duy nhất.

---

## 5. Fake Data Mẫu Đầy Đủ (Tiếng Việt)

### 5.1. 4 Công trình (`projects`)

```js
export const projects = [
  {
    id: "P001",
    name: "Chung cư The Sun Riverside",
    address: "Số 12 Nguyễn Văn Linh, Quận 7, TP.HCM",
    investor: "Công ty CP Đầu tư Sun Land",
    manager: "Nguyễn Văn An",
    status: "Đang thi công",
    progress: 68,
    startDate: "2025-11-01",
    expectedEndDate: "2026-12-15",
    totalTasks: 5,
    lateTasks: 2,
  },
  {
    id: "P002",
    name: "Nhà xưởng KCN Long Hậu",
    address: "Lô C3, KCN Long Hậu, Long An",
    investor: "Công ty TNHH Sản xuất Tân Phát",
    manager: "Trần Thị Bích",
    status: "Đang thi công",
    progress: 42,
    startDate: "2026-02-10",
    expectedEndDate: "2026-10-30",
    totalTasks: 5,
    lateTasks: 1,
  },
  {
    id: "P003",
    name: "Biệt thự Thảo Điền Garden",
    address: "45 Đường Số 10, Thảo Điền, TP.Thủ Đức",
    investor: "Chủ đầu tư cá nhân — Ông Lê Quốc Bảo",
    manager: "Phạm Minh Tuấn",
    status: "Tạm dừng",
    progress: 25,
    startDate: "2026-01-05",
    expectedEndDate: "2026-09-20",
    totalTasks: 5,
    lateTasks: 1,
  },
  {
    id: "P004",
    name: "Trường Mầm non Hoa Mai",
    address: "78 Lê Văn Việt, TP.Thủ Đức",
    investor: "Công ty Giáo dục Hoa Mai",
    manager: "Nguyễn Văn An",
    status: "Hoàn thành",
    progress: 100,
    startDate: "2025-06-01",
    expectedEndDate: "2026-01-15",
    totalTasks: 3,
    lateTasks: 0,
  },
];
```

### 5.2. 8 Công việc (`tasks`)

```js
export const tasks = [
  { id: "T001", projectId: "P001", name: "Đổ bê tông sàn tầng 12", assignee: "Lê Văn Hùng", dueDate: "2026-07-02", status: "Trễ hạn" },
  { id: "T002", projectId: "P001", name: "Lắp đặt hệ thống điện tầng 8", assignee: "Nguyễn Văn An", dueDate: "2026-07-05", status: "Đang làm" },
  { id: "T003", projectId: "P001", name: "Nghiệm thu chống thấm tầng hầm", assignee: "Lê Văn Hùng", dueDate: "2026-06-28", status: "Trễ hạn" },
  { id: "T004", projectId: "P002", name: "Lắp khung thép kèo mái", assignee: "Trần Thị Bích", dueDate: "2026-07-08", status: "Đang làm" },
  { id: "T005", projectId: "P002", name: "Thi công nền xưởng khu A", assignee: "Đỗ Thanh Tùng", dueDate: "2026-07-01", status: "Trễ hạn" },
  { id: "T006", projectId: "P003", name: "Hoàn thiện sơn nước ngoại thất", assignee: "Phạm Minh Tuấn", dueDate: "2026-06-30", status: "Trễ hạn" },
  { id: "T007", projectId: "P003", name: "Lắp cửa gỗ tầng 2", assignee: "Phạm Minh Tuấn", dueDate: "2026-07-10", status: "Chưa bắt đầu" },
  { id: "T008", projectId: "P004", name: "Bàn giao mặt bằng sân chơi", assignee: "Nguyễn Văn An", dueDate: "2026-01-10", status: "Hoàn thành" },
];
```
(Ghi chú: mỗi project có `totalTasks` khớp với số task liệt kê tương ứng trong mảng trên khi lọc theo `projectId`; có thể bổ sung thêm task nhỏ cho đủ số nếu Codex muốn khớp chính xác 5/5/5/3, đây chỉ là bộ khung tối thiểu 8 việc đại diện.)

### 5.3. 8 Nhật ký hiện trường (`siteLogs`)

```js
export const siteLogs = [
  { id: "L001", projectId: "P001", author: "Lê Văn Hùng", date: "2026-07-03 07:45", note: "Hoàn tất cốp pha sàn tầng 12, chuẩn bị đổ bê tông sáng mai. Thời tiết thuận lợi.", relatedTask: "Đổ bê tông sàn tầng 12", imageQuery: "concrete formwork construction" },
  { id: "L002", projectId: "P001", author: "Nguyễn Văn An", date: "2026-07-02 16:20", note: "Kiểm tra tủ điện tầng 8, phát hiện dây dẫn cần thay loại chống cháy theo yêu cầu PCCC.", relatedTask: "Lắp đặt hệ thống điện tầng 8", imageQuery: "electrical wiring construction site" },
  { id: "L003", projectId: "P001", author: "Lê Văn Hùng", date: "2026-06-29 09:10", note: "Phát hiện vết nứt nhỏ tại khu vực chống thấm tầng hầm, đã báo đội thi công xử lý lại.", relatedTask: "Nghiệm thu chống thấm tầng hầm", imageQuery: "basement waterproofing" },
  { id: "L004", projectId: "P002", author: "Trần Thị Bích", date: "2026-07-03 08:30", note: "Đội thi công đã lắp xong 60% khung kèo mái khu A, dự kiến hoàn tất trong 3 ngày tới.", relatedTask: "Lắp khung thép kèo mái", imageQuery: "steel frame roof construction" },
  { id: "L005", projectId: "P002", author: "Đỗ Thanh Tùng", date: "2026-07-01 14:00", note: "Nền xưởng khu A bị chậm do mưa lớn 2 ngày liên tiếp, đề xuất gia hạn 3 ngày.", relatedTask: "Thi công nền xưởng khu A", imageQuery: "warehouse floor construction rain" },
  { id: "L006", projectId: "P003", author: "Phạm Minh Tuấn", date: "2026-06-30 10:15", note: "Sơn ngoại thất mặt tiền chính đã hoàn thành, còn lại mặt hông chưa thi công do tạm dừng dự án.", relatedTask: "Hoàn thiện sơn nước ngoại thất", imageQuery: "house exterior paint construction" },
  { id: "L007", projectId: "P003", author: "Phạm Minh Tuấn", date: "2026-06-20 08:00", note: "Họp với chủ đầu tư về việc tạm dừng thi công để điều chỉnh thiết kế nội thất tầng 2.", relatedTask: null, imageQuery: "construction site meeting" },
  { id: "L008", projectId: "P004", author: "Nguyễn Văn An", date: "2026-01-10 11:00", note: "Đã bàn giao mặt bằng sân chơi cho nhà trường, nghiệm thu đạt yêu cầu, không phát sinh lỗi.", relatedTask: "Bàn giao mặt bằng sân chơi", imageQuery: "school playground construction complete" },
];
```

### 5.4. 5 Nhân sự (`staff`)

```js
export const staff = [
  { id: "S001", name: "Nguyễn Văn An", role: "Quản lý dự án", phone: "0901 234 567", avatarSeed: "an" },
  { id: "S002", name: "Trần Thị Bích", role: "Giám sát công trình", phone: "0912 345 678", avatarSeed: "bich" },
  { id: "S003", name: "Lê Văn Hùng", role: "Kỹ sư thi công", phone: "0923 456 789", avatarSeed: "hung" },
  { id: "S004", name: "Phạm Minh Tuấn", role: "Giám sát công trình", phone: "0934 567 890", avatarSeed: "tuan" },
  { id: "S005", name: "Đỗ Thanh Tùng", role: "Kỹ sư thi công", phone: "0945 678 901", avatarSeed: "tung" },
];
```

### 5.5. 4 Cảnh báo (`alerts`)

```js
export const alerts = [
  { id: "A001", projectId: "P001", title: "2 công việc trễ hạn tại The Sun Riverside", level: "Cao", detail: "Đổ bê tông sàn tầng 12 và nghiệm thu chống thấm tầng hầm đều đã quá hạn." },
  { id: "A002", projectId: "P002", title: "Thi công nền xưởng chậm tiến độ", level: "Cao", detail: "Trễ 2 ngày do ảnh hưởng thời tiết, cần theo dõi sát." },
  { id: "A003", projectId: "P003", title: "Dự án tạm dừng hơn 10 ngày", level: "Trung bình", detail: "Biệt thự Thảo Điền Garden đang tạm dừng chờ chốt lại thiết kế nội thất." },
  { id: "A004", projectId: "P003", title: "Công việc sơn ngoại thất trễ hạn", level: "Trung bình", detail: "Hoàn thiện sơn nước ngoại thất đã quá hạn 4 ngày." },
];
```

---

## 6. UI Style Guide

**Màu chủ đạo:** Indigo/Blue-violet hiện đại — `#4F46E5` (primary), hover `#4338CA`.
**Màu phụ:**
- Nền chính: `#FFFFFF`
- Nền phụ/section: `#F8FAFC` (slate-50)
- Border: `#E2E8F0` (slate-200)
- Text chính: `#0F172A` (slate-900)
- Text phụ: `#64748B` (slate-500)
- Success: `#10B981` | Warning: `#F59E0B` | Danger: `#EF4444`

**Font đề xuất:** `Inter` (Google Fonts) cho toàn bộ UI — dễ đọc, phong cách SaaS chuẩn Linear/Notion. Fallback: `-apple-system, sans-serif`.

**Spacing:** Dùng hệ 4px base (4/8/12/16/24/32/48). Container padding desktop 32px, mobile 16px.

**Card style:** Bo góc `rounded-2xl` (16px), border `1px solid #E2E8F0`, shadow rất nhẹ `0 1px 3px rgba(0,0,0,0.04)`, hover shadow tăng nhẹ khi có thể click.

**Button style:**
- Primary: nền `#4F46E5`, chữ trắng, bo góc `rounded-xl` (12px), padding `12px 20px`, font-weight 600.
- Secondary: nền trắng, border slate-200, chữ slate-900.
- Full-width trên mobile cho action chính (VD nút "Gửi nhật ký").

**Badge trạng thái (status):**
- "Đang thi công" → nền xanh dương nhạt, chữ xanh dương đậm.
- "Tạm dừng" → nền vàng nhạt, chữ vàng cam đậm.
- "Hoàn thành" → nền xanh lá nhạt, chữ xanh lá đậm.
- "Trễ hạn" → nền đỏ nhạt, chữ đỏ đậm.
- "Đang làm" → nền tím nhạt, chữ tím đậm.
- "Chưa bắt đầu" → nền xám nhạt, chữ xám đậm.

**Icon style:** Dùng bộ icon outline nhất quán (ví dụ `lucide-react`) — mảnh, hiện đại, không dùng icon 3D/màu mè.

**Chart style:** Nếu có biểu đồ (ví dụ mini progress trong dashboard), chỉ dùng thanh tiến độ ngang (progress bar) bo tròn 2 đầu, màu primary trên nền xám nhạt — KHÔNG cần chart phức tạp (pie/line) cho bản demo này.

**Responsive rule:**
- Breakpoint chính: `768px` (mobile/tablet) và `1024px` (desktop).
- Dashboard/Danh sách/Chi tiết công trình: ưu tiên trải nghiệm desktop, nhưng vẫn responsive tốt trên mobile (xếp cột dọc).
- Form thêm nhật ký: ưu tiên trải nghiệm mobile (thiết kế mobile-first, test ở viewport ~390px trước).

---

## 7. Interaction Flow (Click Flow)

```
Dashboard (/construction-demo)
   │  click "Xem tất cả" hoặc click 1 công trình
   ▼
Danh sách công trình (/construction-demo/projects)
   │  click vào 1 card công trình
   ▼
Chi tiết công trình (/construction-demo/projects/:id)
   │  click tab "Nhật ký hiện trường"
   ▼
Nhật ký hiện trường (trong tab, hoặc /construction-demo/logs)
   │  click "+ Thêm nhật ký"
   ▼
Form thêm nhật ký (/construction-demo/logs/new)
   │  điền form → click "Gửi nhật ký"
   ▼
Loading (~800ms) → Toast "✅ Đã gửi nhật ký hiện trường thành công!"
   │  tự động điều hướng sau ~1.5s
   ▼
Quay lại Nhật ký hiện trường — nhật ký mới nằm ở đầu danh sách
```

Toàn bộ điều hướng dùng client-side routing (React Router), không reload trang, có transition mượt (fade/slide nhẹ ~150-200ms) giữa các trang để tạo cảm giác "premium".

---

## 8. Những thứ tuyệt đối KHÔNG làm

- ❌ Không backend, không API thật, không server riêng.
- ❌ Không database (không Postgres/Mongo/Firebase...).
- ❌ Không login/auth thật (nếu cần "cảm giác" đăng nhập, chỉ làm 1 màn hình login tĩnh không kiểm tra mật khẩu, KHÔNG bắt buộc).
- ❌ Không clone giao diện FastWork/FastCons — chỉ tham khảo ý tưởng nghiệp vụ.
- ❌ Không tích hợp AI/chatbot trong demo.
- ❌ Không phân quyền nhiều role phức tạp (không làm role-based access control).
- ❌ Không export Excel/PDF thật.
- ❌ Không notification/push thật (chỉ toast UI giả lập).
- ❌ Không bắt buộc upload ảnh thật từ thiết bị (dùng ảnh placeholder là đủ).
- ❌ Không vượt quá 5 màn hình chính đã liệt kê.
- ❌ Không thêm tính năng "để sau này show cho ngầu" nếu không nằm trong scope — mọi ý tưởng phát sinh ghi vào mục Backlog riêng, không code ngay.
- ❌ Không đụng/sửa các route, component, style khác của `luanai.io.vn` ngoài phạm vi `/construction-demo`.

---

## 9. Definition of Done

- [ ] Có route `/construction-demo` chạy được, không lỗi console.
- [ ] Đủ 5 màn hình: Dashboard, Danh sách công trình, Chi tiết công trình, Nhật ký hiện trường, Form thêm nhật ký.
- [ ] Có đầy đủ fake data: 4 công trình, 8 công việc, 8 nhật ký, 5 nhân sự, 4 cảnh báo — hiển thị đúng, không có "undefined"/dữ liệu rỗng do lỗi mapping.
- [ ] Responsive tốt ở 3 breakpoint: mobile (~390px), tablet (~768px), desktop (~1280px+).
- [ ] Click flow đầy đủ theo mục 7, không bị route "chết" (404) ở bất kỳ bước nào.
- [ ] Form thêm nhật ký có validate cơ bản + trạng thái loading + toast thành công + nhật ký mới xuất hiện trong danh sách sau khi gửi.
- [ ] Không ảnh hưởng, không phá vỡ bất kỳ trang nào khác đang có trên `luanai.io.vn`.
- [ ] Build production pass (`npm run build` không lỗi).
- [ ] Có file `DEMO_SCOPE.md` (chính file này) được đặt trong thư mục source của tính năng để tra cứu về sau.
- [ ] Toàn bộ text hiển thị là tiếng Việt, không sót text tiếng Anh mặc định (trừ code/comment).

---

## 10. Risk & Scope Control (kiểm soát không phình scope trong 1-2 ngày)

**Nguyên tắc cứng:**
1. **Time-box tuyệt đối:** Ngày 1 = dựng xong layout + Dashboard + Danh sách + Chi tiết công trình (3 màn). Ngày 2 = Nhật ký hiện trường + Form thêm nhật ký + polish UI + responsive + fix bug. Nếu hết ngày 1 mà chưa xong 3 màn đầu, CẮT bớt: bỏ animation phụ, bỏ chart, giữ lại chức năng cốt lõi.
2. **Không nhận thêm yêu cầu giữa chừng từ khách vào bản demo hiện tại.** Mọi góp ý/khảo sát thêm trong lúc demo → ghi vào file backlog riêng (`BACKLOG_NEXT.md`), không sửa code ngay trong lúc đang chạy demo bán hàng.
3. **1 người dùng giả định = xuyên suốt câu chuyện.** Không làm nhiều role, nhiều luồng đăng nhập khác nhau — chỉ 1 góc nhìn quản lý (desktop) + 1 góc nhìn hiện trường (mobile), vì đây là điều khách cần thấy để tin tưởng, không phải để dùng thật.
4. **Ưu tiên "trông thật" hơn "chạy được nhiều tính năng".** Một dashboard đẹp, mượt, dữ liệu hợp lý quan trọng hơn 10 tính năng nhưng UI thô.
5. **Nếu thiếu thời gian, cắt theo thứ tự ưu tiên giảm dần:**
   - Giữ lại bằng mọi giá: Dashboard + Danh sách công trình + Form thêm nhật ký (đây là 3 màn "gây trust" mạnh nhất).
   - Có thể đơn giản hóa nếu thiếu thời gian: Chi tiết công trình (bỏ bớt tab, chỉ giữ Tổng quan + Công việc).
   - Có thể lược bỏ cuối cùng nếu bí thời gian: trang Nhật ký hiện trường độc lập (`/logs`) — có thể gộp logic xem trong tab của Chi tiết công trình.
6. **Không tự ý đổi kiến trúc route/component đã chốt** giữa chừng — nếu Codex đề xuất cách khác, ghi nhận nhưng ưu tiên bám sát tài liệu này để tránh trễ tiến độ 1-2 ngày.

---

## 11. Final Codex Prompt (Copy nguyên văn để đưa vào Codex)

```
Bạn là Senior Frontend Engineer. Hãy triển khai một demo web tên "SiteFlow Demo" trong project luanai.io.vn, đặt tại route /construction-demo, theo đúng tài liệu requirement dưới đây. Đây là DEMO BÁN HÀNG với fake data, không cần backend, không cần database, không cần authentication thật.

YÊU CẦU KỸ THUẬT:
- Dùng React + React Router cho routing.
- Toàn bộ dữ liệu là mock data local (file data/mockData.js), không gọi API thật.
- Styling: Tailwind CSS (hoặc CSS module nếu project hiện tại không dùng Tailwind — giữ nguyên convention hiện có của project luanai.io.vn).
- Icon: dùng lucide-react.
- Toàn bộ nội dung hiển thị bằng tiếng Việt.
- Phong cách UI: SaaS hiện đại, clean, premium, gần giống Linear/Notion/Stripe dashboard — nền trắng/xám nhạt, điểm nhấn màu indigo (#4F46E5), card bo góc rounded-2xl, shadow nhẹ, typography rõ ràng (font Inter).
- Không được đụng/sửa bất kỳ route, component, hoặc style nào khác ngoài phạm vi /construction-demo.

PHẠM VI: đúng 5 màn hình, đúng 5 route sau:
1. /construction-demo — Dashboard tổng quan
2. /construction-demo/projects — Danh sách công trình
3. /construction-demo/projects/:id — Chi tiết công trình (3 tab: Tổng quan, Công việc, Nhật ký hiện trường)
4. /construction-demo/logs — Nhật ký hiện trường (feed dạng timeline)
5. /construction-demo/logs/new — Form thêm nhật ký hiện trường (mobile-first)

Hãy đọc kỹ toàn bộ nội dung sau đây — đây là tài liệu requirement đầy đủ, gồm chi tiết từng màn hình, fake data mẫu, style guide, và interaction flow. Triển khai đúng theo tài liệu, không cần hỏi lại tôi thêm:

[DÁN TOÀN BỘ NỘI DUNG FILE DEMO_SCOPE.md TỪ MỤC 3 ĐẾN MỤC 9 VÀO ĐÂY]

YÊU CẦU OUTPUT CUỐI CÙNG:
1. Toàn bộ code đặt trong thư mục /construction-demo theo cấu trúc đã mô tả ở mục 3 (Information Architecture).
2. Tạo file data/mockData.js chứa đầy đủ 4 công trình, 8 công việc, 8 nhật ký hiện trường, 5 nhân sự, 4 cảnh báo đúng như mục 5.
3. Copy nguyên văn tài liệu này vào file DEMO_SCOPE.md trong thư mục feature.
4. Đảm bảo build pass, không lỗi console, responsive tốt trên mobile lẫn desktop.
5. Không tạo thêm màn hình/tính năng ngoài phạm vi đã liệt kê, kể cả khi bạn nghĩ nó "hay".
6. Khi xong, liệt kê ngắn gọn danh sách file đã tạo/sửa để tôi review.
```

---

*(Hết tài liệu — file này chính là DEMO_SCOPE.md cần đính kèm trong bản triển khai)*
