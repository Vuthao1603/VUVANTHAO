const Blogs = require("../models/Blogs");
const { mutipleMongooseToObject } = require("../../util/mongoose");


class BlogController {
  // GET blog page
  index(req, res, next) {
    Blogs.find({})
      .then((blogs) => {
        res.render("blog", { layout: "about-layout", blogs: mutipleMongooseToObject(blogs) });
      })
      .catch(next);
  }
}

module.exports = new BlogController();
