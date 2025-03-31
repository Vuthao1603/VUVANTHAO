const express = require("express");
const path = require("path");
const morgan = require("morgan");
const methodOverride = require("method-override");
const handlebars = require("express-handlebars");
const app = express();
const port = 30000;

const route = require("./routes");
const db = require("./config/db");

//connect to db
db.connect();

//HTttp loggern
app.use(morgan("combined"));
app.use(express.static(path.join(__dirname, "public")));

//Template engine
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b, //de su dung trong handlebars store-tours.hbs
      tours: () => "Danh sách tour!", // Thêm helper tours
    },
  }),
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//HTTP method override
app.use(methodOverride("_method"));

//Route init:Khoi tao tuyen duong
route(app);

app.listen(port, () =>
  console.log(`Server is running on port at http://localhost:${port}`),
);
