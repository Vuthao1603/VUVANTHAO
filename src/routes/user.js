// routes/user.js
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});
