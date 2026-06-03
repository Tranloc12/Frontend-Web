<div align="center">
  <img src="https://storage.googleapis.com/futa-busline-web-cms-prod/futa_group_76b71bf386/futa_group_76b71bf386.svg" alt="Logo" width="150" height="auto" />
  <h1>🚌 HỆ THỐNG QUẢN LÝ BẾN XE KHÁCH (FRONTEND)</h1>
  <p><i>Giao diện người dùng hiện đại, phong cách White Luxury chuyên nghiệp mang tiêu chuẩn Enterprise.</i></p>

  <!-- Badges -->
  <p>
    <img src="https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=white" alt="React" />
    <img src="https://img.shields.io/badge/React_Router-6.x-CA4245?logo=react-router&logoColor=white" alt="React Router" />
    <img src="https://img.shields.io/badge/Bootstrap-5.x-7952B3?logo=bootstrap&logoColor=white" alt="Bootstrap" />
    <img src="https://img.shields.io/badge/Axios-HTTP-5A29E4" alt="Axios" />
  </p>
</div>

## 🌟 TỔNG QUAN DỰ ÁN
Đây là mã nguồn Frontend cho dự án **Hệ Thống Quản Lý Bến Xe Khách**. Hệ thống được xây dựng bằng thư viện ReactJS, tập trung mang lại trải nghiệm người dùng (UX) tối ưu và giao diện (UI) hiện đại theo xu hướng **White Luxury**.

## ✨ CÁC TÍNH NĂNG NỔI BẬT ĐƯỢC TÍCH HỢP

### Dành cho Khách hàng (Passengers)
*   🎫 **Đặt vé & Chọn ghế trực quan**: Mô phỏng sơ đồ xe thật, dễ dàng thao tác chọn/hủy ghế.
*   🎟️ **Hệ thống Mã Giảm Giá (Voucher)**: Nhập mã giảm giá tự động tính toán tổng tiền.
*   💳 **Thanh toán đa nền tảng**: Tích hợp sẵn VNPay, PayPal, VietQR, ZaloPay, MoMo,...
*   📱 **Vé Điện Tử QR Code**: Tạo vé điện tử động bằng mã QR, hỗ trợ **tải file PDF** hoặc in vé trực tiếp.
*   🤖 **Trợ lý Ảo AI (AI Assistant)**: Khung chat AI tư vấn khách hàng tự động 24/7.
*   📍 **Live Tracking Map**: Xem bản đồ theo dõi vị trí xe thời gian thực.
*   💬 **Live Chat Hỗ trợ**: Tích hợp Chat thời gian thực qua Firebase.

### Dành cho Quản trị viên (Admin/Manager)
*   📊 **Dashboard Analytics (Recharts)**: Bảng thống kê dữ liệu trực quan bằng biểu đồ (Line, Bar, Pie).
*   📥 **Xuất báo cáo Excel (CSV)**: Cho phép xuất báo cáo doanh thu và số lượt chuyến đi.
*   🚌 **Quản lý toàn diện**: CRUD các thực thể (Tuyến đường, Xe, Chuyến xe, Tài khoản, Điểm trung chuyển).

## 🚀 CÀI ĐẶT VÀ CHẠY DỰ ÁN

### Yêu cầu hệ thống
*   Node.js (>= 16.x)
*   NPM hoặc Yarn

### Các bước cài đặt
1. **Clone repository về máy:**
   ```bash
   git clone https://github.com/Tranloc12/Frontend-Web.git
   ```
2. **Di chuyển vào thư mục Frontend:**
   ```bash
   cd Frontend-Web
   ```
3. **Cài đặt các gói thư viện (Dependencies):**
   ```bash
   npm install
   # hoặc dùng yarn: yarn install
   ```
4. **Chạy ứng dụng (Môi trường dev):**
   ```bash
   npm start
   ```
5. Ứng dụng sẽ chạy tại địa chỉ: `http://localhost:3000`

## 🛠️ CÔNG NGHỆ & THƯ VIỆN SỬ DỤNG
*   **Core:** ReactJS (Hooks, Context API).
*   **Routing:** React Router DOM (Xử lý điều hướng trang).
*   **Styling:** CSS3, Bootstrap 5.
*   **Data Fetching:** Axios.
*   **Charts & Visualization:** Recharts (Vẽ biểu đồ Dashboard).
*   **Utilities:** `moment` (Xử lý thời gian), `html2pdf.js` (Xuất PDF), `react-qr-code` (Tạo QR).
*   **Realtime:** Firebase (Chat system).

## 🔗 KẾT NỐI VỚI BACKEND
Cấu hình API kết nối với Backend được định nghĩa tại `src/configs/Apis.js`. Mặc định ứng dụng được cấu hình trỏ tới Cloud Backend, nhưng bạn có thể thay đổi để chạy cục bộ:
```javascript
const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/CarManagementApp/api";
```

## 👨‍💻 NHÓM PHÁT TRIỂN
*   Đồ án chuyên ngành CNTT.
*   Tập trung phát triển hệ thống quản lý chuyên nghiệp chuẩn thực tế.

---
*Cảm ơn bạn đã xem dự án!*
