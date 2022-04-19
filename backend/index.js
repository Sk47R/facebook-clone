const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const homeRoutes = require("./routes/index");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const multer = require("multer");
const path = require("path");

// to use dotenv
dotenv.config();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");

  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(bodyParser.json());
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(morgan("common"));

// middlewares
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File Uploaded success");
  } catch (err) {
    console.log(err);
  }
});

app.use(homeRoutes);
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

// app.use(express.static(path.join(__dirname, "public/images")));

mongoose
  .connect(process.env.MONGO_URL)
  .then((result) => {
    console.log("connected to mongo");
    app.listen(8800, () => {
      console.log("Backend server is running! ");
    });
  })
  .catch((err) => {
    console.log("MongoDB Connection Failed", err);
  });
