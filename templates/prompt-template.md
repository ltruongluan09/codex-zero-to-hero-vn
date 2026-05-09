# Prompt template cho người mới

Prompt tốt là lời giao việc rõ ràng. Bạn không cần dùng từ kỹ thuật phức tạp. Bạn chỉ cần nói đủ bối cảnh để Codex hiểu bạn đang muốn tạo gì, cho ai, dùng để làm gì.

## Prompt tốt là gì?

Một prompt tốt thường có:

- Bối cảnh: Bạn là ai, đang làm việc gì.
- Mục tiêu: Bạn muốn tạo thứ gì.
- Người dùng: Ai sẽ dùng sản phẩm này.
- Dữ liệu: Có những thông tin nào.
- Giao diện: Muốn nhìn và dùng ra sao.
- Kết quả: Sau khi làm xong cần có gì.
- Giới hạn: Điều gì chưa cần làm.

## Prompt xấu là gì?

```text
Làm cho tôi một app đẹp.
```

Vấn đề: Codex không biết app gì, cho ai, dùng để làm gì, đẹp theo kiểu nào.

## Prompt tốt hơn

```text
Tôi là nhân sự trong công ty 80 người. Tôi muốn tạo một dashboard đơn giản để theo dõi số lượng nhân viên theo phòng ban, nhân sự mới trong tháng, nhân sự nghỉ việc và danh sách sinh nhật tháng này. Người dùng là HR và trưởng phòng. Giao diện cần rõ ràng, hiện đại, dễ xem trong cuộc họp. Hãy tạo bản demo với dữ liệu mẫu trước.
```

## Cách mô tả yêu cầu

Dùng công thức:

```text
Tôi là [vai trò].
Tôi muốn tạo [sản phẩm/tool].
Tool này giúp [mục đích công việc].
Người dùng là [đối tượng].
Dữ liệu gồm [dữ liệu đầu vào].
Kết quả cần có [đầu ra].
Giao diện nên [phong cách].
Trước mắt chỉ cần [phạm vi bản đầu].
```

## Cách chia task

Thay vì nói:

```text
Làm app quản lý nhân sự đầy đủ.
```

Hãy nói:

```text
Hãy chia app quản lý nhân sự thành 5 bước nhỏ để người mới có thể build dần. Bước 1 chỉ cần danh sách nhân viên, thêm nhân viên mới, và tìm kiếm theo tên.
```

## Cách yêu cầu Codex sửa lỗi

```text
Tôi vừa bấm [hành động] thì gặp lỗi sau:

[dán lỗi]

Hãy:
1. Giải thích lỗi bằng ngôn ngữ dễ hiểu.
2. Tìm nguyên nhân trong project.
3. Sửa lỗi.
4. Chạy lại để kiểm tra.
5. Nói tôi cần thử lại thao tác nào.
```

## Cách yêu cầu Codex cải thiện UI

```text
Hãy cải thiện UI cho màn hình này theo hướng hiện đại, rõ ràng, chuyên nghiệp, phù hợp cho người quản lý xem nhanh trong 3 phút. Ưu tiên khoảng cách, font dễ đọc, màu sắc tin cậy, trạng thái rỗng, responsive mobile. Không thêm tính năng mới nếu chưa cần.
```

