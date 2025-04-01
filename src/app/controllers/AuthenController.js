const Accounts = require("../models/Accounts");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthenController {
  // [GET] /login
  showLoginform(req, res, next) {
    res.render("login", { layout: "login-layout" }); // Sử dụng layout login-layout.hbs
  }
  // [GET] /register
  showRegisterform(req, res, next) {
    res.render("register", { layout: "login-layout" }); // Sử dụng layout login-layout.hbs
  }
  // [POST] /register
  

  // [POST] /login
  async login(req, res, next) {
    const { username, password } = req.body;

    try {
      // Tìm người dùng trong MongoDB
      const user = await Accounts.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: "Tài khoản không tồn tại!" });
      }

      // Kiểm tra mật khẩu
      // const isPasswordValid = await bcrypt.compare(password, user.password);
      // if (!isPasswordValid) {
      //   return res.status(401).json({ message: "Sai mật khẩu!" });
      // }
      if (password !== user.password) {
        return res.status(401).json({ message: "Sai mật khẩu!" });
      }

      // Chuyển hướng dựa trên vai trò
      if (user.role === "admin") {
        return res.redirect("/admin"); // Chuyển hướng đến trang admin
      } else if (user.role === "user") {
        return res.redirect("/"); // Chuyển hướng đến trang chủ
      } else {
        return res.status(403).json({ message: "Vai trò không hợp lệ!" });
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      res.status(500).json({ message: "Đã xảy ra lỗi!" });
    }
  }
}

module.exports = new AuthenController();