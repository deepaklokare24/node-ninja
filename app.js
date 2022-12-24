const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blogs");

const app = express();
app.set("view engine", "ejs");

const DB_URL =
  "mongodb+srv://deepak:bunty@cluster0.j8t20t5.mongodb.net/blogger";

mongoose.connect(
  DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (!error) {
      console.log("connected to mongoDB!");
      app.listen(2020, function () {
        console.log("listening...");
      });
    } else {
      console.log("connection to mongoDB failed \n" + error);
    }
  }
);

app.use(express.static("public"));

app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log("New Request is made...");
  console.log("Host : ", req.hostname);
  console.log("Path : ", req.path);
  console.log("Method : ", req.method);
  next();
});

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((blogs) => res.render("index", { title: "Home", blogs }))
    .catch((error) => console.log(error));
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

// mongoose related routes

app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "About my Live",
    snippet: "Its a long story",
    body: "Once upon a time there was a guy by name DK",
  });
  blog
    .save()
    .then((result) => res.send(result))
    .catch((error) => console.log(error));
});

// app.get("/all-blogs", (req, res) => {
//   Blog.find()
//     .then((result) => res.send(result))
//     .catch((error) => console.log(error));
// });

// app.get("/all-blogs/:id", (req, res) => {
//   Blog.findById(req.params.id)
//     .then((result) => res.send(result))
//     .catch((error) => console.log(error));
// });

// app.use((req, res) => {
//   res.status(404).render("404", { title: "Not Found" });
// });
