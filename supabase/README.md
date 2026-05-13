# Supabase setup cho Lumi Labs

Mục tiêu: tạo nơi lưu người dùng đăng nhập, email đăng ký, project đang theo dõi và gói thành viên sau này.

## Bước 1: Mở Supabase

1. Vào Supabase project của bạn.
2. Mở **SQL Editor**.
3. Bấm **New query**.
4. Copy toàn bộ nội dung trong file `schema.sql`.
5. Paste vào SQL Editor.
6. Bấm **Run**.

Nếu chạy thành công, Supabase sẽ có 4 bảng:

- `profiles`
- `subscribers`
- `followed_projects`
- `memberships`

## Bước 2: Bật đăng nhập Google

Trong Supabase:

1. Vào **Authentication**.
2. Vào **Providers**.
3. Bật **Google**.
4. Làm theo hướng dẫn của Supabase để nhập Google Client ID và Client Secret.

Facebook có thể bật sau. Google trước là đủ để test.

## Bước 3: Redirect URL

Trong Supabase Authentication URL Configuration, thêm:

Local:

```text
http://localhost:5174
```

Production:

```text
https://codex-zero-to-hero-vn.vercel.app
```

## Bước 4: Env cần set

Local hoặc Vercel:

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

Ý nghĩa:

- `NEXT_PUBLIC_SUPABASE_URL`: frontend dùng để gọi Supabase Auth.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: frontend dùng cho login/session.
- `SUPABASE_URL`: serverless API dùng để lưu subscriber.
- `SUPABASE_SERVICE_ROLE_KEY`: serverless API dùng để ghi subscriber an toàn.

Không đưa service role key vào frontend.
