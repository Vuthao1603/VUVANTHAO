const Accounts = require("../models/Accounts");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthenController {
  // [GET] /login
  showLoginform(req, res, next) {
    res.render("login", { layout: "login-layout" }); // Sử dụng layout login-layout.hbs
  }

  showRegisterform(req, res, next) {
    res.render("register", { layout: "register-layout" }); // Sử dụng layout login-layout.hbs
  }
  // [POST] /register
  async register(req, res, next) {
    // Lấy dữ liệu từ request body
    const { username, password, confirmpassword } = req.body;

    // Kiểm tra mật khẩu xác nhận
    if (password !== confirmpassword) {
      return res.render("register", {
        layout: "register-layout",
        message: "Mật khẩu xác nhận không khớp!",
      });
    }

    try {
      // Kiểm tra xem username đã tồn tại chưa
      const existingUser = await Accounts.findOne({ username });
      if (existingUser) {
        return res.render("register", {
          layout: "register-layout",
          message: "Tên tài khoản đã tồn tại!",
        });
      }

      // Mã hóa mật khẩu
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Tạo tài khoản mới
      const newUser = new Accounts({
        username,
        password: hashedPassword,
        role: "user",
      });

      // Lưu tài khoản vào MongoDB
      await newUser.save();

      // Chuyển hướng đến trang đăng nhập với thông báo thành công
      return res.render("login", {
        layout: "login-layout",
        success: "Đăng ký thành công! Vui lòng đăng nhập.",
      });
    } catch (error) {
      console.error("Lỗi khi đăng ký tài khoản:", error);
      res.render("register", {
        layout: "register-layout",
        message: "Đã xảy ra lỗi trong quá trình đăng ký!",
      });
    }
  }

  // [POST] /login
  async login(req, res, next) {
    const { username, password } = req.body;

    // Kiểm tra xem username và password có được cung cấp không

    try {
      const user = await Accounts.findOne({ username });
      if (!user) {
        console.log("Tài khoản không tồn tại:", username);
        return res.render("login", {
          layout: "login-layout",
          message: "Tài khoản không tồn tại!",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        console.log("Sai mật khẩu cho tài khoản:", username);
        return res.render("login", {
          layout: "login-layout",
          message: "Sai mật khẩu!",
        });
      }


      if (user.role === "admin") {
        console.log("Chuyển hướng đến trang admin");
        return res.redirect("/admin");
      } else if (user.role === "user") {
        console.log("Chuyển hướng đến trang chính");
        return res.redirect("/");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      res.render("login", {
        message: "Đã xảy ra lỗi trong quá trình đăng nhập!",
      });
    }
  }
}

module.exports = new AuthenController();
