module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.session && req.session.user) {
      return next();
    }
    return res.redirect("/login"); // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
  },

  ensureAdmin: (req, res, next) => {
    if (req.session && req.session.user && req.session.user.role === "admin") {
      return next();
    }
    return res.status(403).send("Bạn không có quyền truy cập vào trang này!"); // Trả về lỗi nếu không phải admin
  },
};