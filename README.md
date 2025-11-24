
[README](README.md) | [MESSAGE-RULE](MESSAGE-RULE.md) 
# EParkKTX - Hệ thống quản lý bãi giữ xe cho Ký túc xá


Quản lý gửi xe KTX - Node.js (backend) & React.js (frontend)

# eParkKTX Frontend (React + Webpack + Babel)

## Yêu cầu cài đặt
- Node.js >= 16
- npm >= 8

## Chạy dự án
```bash
npm start
```
- Ứng dụng sẽ chạy tại: http://localhost:3000/

## Ghi chú
- Nếu gặp lỗi "Module parse failed: Unexpected token" với JSX, hãy chắc chắn đã cài đúng các package trên.
- Có thể chỉnh sửa các cấu hình trong `webpack.config.js` và `babel.config.json` nếu cần.

## Cấu trúc dự án

```
ĐATH_CNPM/
│
├── client/            # Frontend React.js
│   ├── public/        # index.html, favicon, ...
│   └── src/
│       ├── assets/    # Ảnh, icon, font
│       ├── components/# Component giao diện chung
│       ├── context/   # React Context
│       ├── hooks/     # Custom hooks
│       ├── pages/     # Mỗi chức năng 1 page
│       ├── services/  # Hàm gọi API/backend
│       ├── styles/    # CSS/scss toàn cục
│       ├── types/     # Định nghĩa kiểu dữ liệu
│       ├── utils/     # Hàm tiện ích
│       ├── App.js     # Router chính
│       └── index.js   # Entry point React
│
└── README.md          # Hướng dẫn dự án
```

## Cách sử dụng

### Frontend (client)

```sh
cd client
npm install
npm start
```
- Ứng dụng React chạy ở http://localhost:8080 (hoặc port webpack config)

## Cài đặt các package cần thiết cho Babel/Webpack (nếu chưa có)
```bash
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react babel-loader style-loader css-loader file-loader
```

## Cấu hình đã có sẵn
- `webpack.config.js`: Đã cấu hình Babel loader cho JSX/ES6, CSS, ảnh.
- `babel.config.json`: Đã preset cho React.

### Một số lưu ý
- Chỉnh sửa cấu hình kết nối backend trong các file service (nếu cần).
- Đảm bảo backend chạy trước khi dùng các chức năng cần API.
- Có thể mở rộng thêm các thư mục khác theo nhu cầu.

---

Nếu cần hướng dẫn chi tiết hơn hoặc gặp lỗi, hãy xem lại README này hoặc liên hệ người phát triển.
