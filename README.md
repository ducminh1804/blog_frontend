# Blog Frontend

Frontend cho hệ thống Blog cá nhân, được xây dựng bằng React, TypeScript và Vite. Dự án này cung cấp giao diện người dùng để tương tác với backend như xem bài viết, đăng nhập, đăng ký, tạo và chỉnh sửa bài viết, v.v.

---



## 📌 Các tính năng chính
- Chat real-time qua WebSocket + STOMP (publish/subscribe)
- Infinity scroll bài viết (load dần khi cuộn)
- Upload ảnh & video trong bài viết
- Comment lồng nhau, hỗ trợ mở rộng vô hạn (infinity expand)
- Đa ngôn ngữ (i18n) – chuyển đổi ngôn ngữ giao diện linh hoạt
- Hiển thị danh sách bài viết, chi tiết bài viết
- Đăng nhập / Đăng ký người dùng
- Tạo bài viết, chỉnh sửa và xóa bài viết (nếu có quyền)
- Giao diện responsive, dễ sử dụng
- Tích hợp API từ backend (RESTful API)
- Lịch sử bài viết đã xem (Session Storage)

---

## 🛠️ Công nghệ sử dụng

| Công nghệ | Mô tả |
|----------|-------|
| [i18next](https://www.i18next.com/) | Hỗ trợ đa ngôn ngữ (internationalization) |
| [React](https://reactjs.org/) | Thư viện JavaScript xây dựng giao diện người dùng |
| [TypeScript](https://www.typescriptlang.org/) | Ngôn ngữ lập trình mở rộng của JavaScript với hệ thống kiểu tĩnh |
| [Vite](https://vitejs.dev/) | Công cụ build và bundler hiện đại, nhanh chóng cho frontend |
| [Axios](https://axios-http.com/) | HTTP client để giao tiếp với backend API |
| [React Router DOM](https://reactrouter.com/) | Thư viện định tuyến cho ứng dụng React |
| [Tailwind CSS ](https://tailwindcss.com/) | Framework CSS tiện lợi|
| [React Query](https://tanstack.com/query/latest) | Quản lý data bất đồng bộ (API, cache, loading, v.v.) |
| [Redux](https://redux.js.org/) | Quản lý state toàn cục |
| [WebSocket + STOMP](https://stomp-js.github.io/) | Giao tiếp thời gian thực qua publish/subscribe |

---

## ⚙️ Cài đặt & Chạy dự án

### 1. Clone project

```bash
git clone https://github.com/ducminh1804/blog_frontend.git
cd blog_frontend
npm run dev
