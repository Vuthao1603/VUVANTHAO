const multer = require("multer");
const path = require("path");

// Đảm bảo bạn cung cấp đúng đường dẫn tuyệt đối từ thư mục gốc của dự án
const uploadPath = path.join(__dirname, "../public/img/uploads");

// Tạo thư mục nếu chưa tồn tại
const fs = require("fs");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath); // Sử dụng đường dẫn tuyệt đối đến thư mục uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Đặt tên file theo thời gian
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); // Cho phép file ảnh
  } else {
    cb(new Error("Chỉ được phép tải lên file ảnh!"), false); // Từ chối nếu không phải ảnh
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
