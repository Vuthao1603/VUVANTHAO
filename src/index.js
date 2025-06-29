const express = require("express");
const path = require("path");
const morgan = require("morgan");
const methodOverride = require("method-override");
const handlebars = require("express-handlebars");
const session = require("express-session");
const app = express();
const port = 3000;
const hbs = handlebars.create();

const route = require("./routes");
const db = require("./config/db");
const { index } = require("./app/controllers/NewsController");

//connect to db
db.connect();

//HTttp loggern
app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, "public")));

//Template engine
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    partialsDir: path.join(__dirname, "resources/views/partials"), // Đường dẫn đến partials
    helpers: {
      sum: (a, b) => a + b, // Helper sum
      tours: () => "Danh sách tour!", // Helper tours
      addOne: (index) => index + 1,
      formatDate: (date) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(date).toLocaleDateString("vi-VN", options);
      },
      formatPrice: (price) => {
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(price);
      },
    },
  }),
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//bao mat middlewaremiddleware//
app.use(
  session({
    secret: "1632004thaook.", // Thay bằng khóa bí mật của bạn
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Đặt `true` nếu sử dụng HTTPS
  }),
);

//HTTP method override
app.use(methodOverride("_method"));

//Route init:Khoi tao tuyen duong
route(app);

app.listen(port, () =>
  console.log(`Server is running on port at http://localhost:${port}`),
);
