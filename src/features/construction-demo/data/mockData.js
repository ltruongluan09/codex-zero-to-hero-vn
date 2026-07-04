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

export const staff = [
  { id: "S001", name: "Nguyễn Văn An", role: "Quản lý dự án", phone: "0901 234 567", avatarSeed: "an" },
  { id: "S002", name: "Trần Thị Bích", role: "Giám sát công trình", phone: "0912 345 678", avatarSeed: "bich" },
  { id: "S003", name: "Lê Văn Hùng", role: "Kỹ sư thi công", phone: "0923 456 789", avatarSeed: "hung" },
  { id: "S004", name: "Phạm Minh Tuấn", role: "Giám sát công trình", phone: "0934 567 890", avatarSeed: "tuan" },
  { id: "S005", name: "Đỗ Thanh Tùng", role: "Kỹ sư thi công", phone: "0945 678 901", avatarSeed: "tung" },
];

export const alerts = [
  { id: "A001", projectId: "P001", title: "2 công việc trễ hạn tại The Sun Riverside", level: "Cao", detail: "Đổ bê tông sàn tầng 12 và nghiệm thu chống thấm tầng hầm đều đã quá hạn." },
  { id: "A002", projectId: "P002", title: "Thi công nền xưởng chậm tiến độ", level: "Cao", detail: "Trễ 2 ngày do ảnh hưởng thời tiết, cần theo dõi sát." },
  { id: "A003", projectId: "P003", title: "Dự án tạm dừng hơn 10 ngày", level: "Trung bình", detail: "Biệt thự Thảo Điền Garden đang tạm dừng chờ chốt lại thiết kế nội thất." },
  { id: "A004", projectId: "P003", title: "Công việc sơn ngoại thất trễ hạn", level: "Trung bình", detail: "Hoàn thiện sơn nước ngoại thất đã quá hạn 4 ngày." },
];

export const imageMap = {
  "concrete formwork construction": "/images/construction/concrete-formwork.jpg",
  "electrical wiring construction site": "/images/construction/electrical-site.jpg",
  "basement waterproofing": "/images/construction/basement-waterproofing.jpg",
  "steel frame roof construction": "/images/construction/steel-frame-roof.jpg",
  "warehouse floor construction rain": "/images/construction/warehouse-floor.jpg",
  "house exterior paint construction": "/images/construction/house-exterior.jpg",
  "construction site meeting": "/images/construction/site-meeting.jpg",
  "school playground construction complete": "/images/construction/school-playground.jpg",
};

export const projectImages = {
  P001: "/images/construction/condo-riverside.jpg",
  P002: "/images/construction/industrial-warehouse.jpg",
  P003: "/images/construction/villa-garden.jpg",
  P004: "/images/construction/school-building.jpg",
};
