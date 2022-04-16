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

// to use dotenv
dotenv.config();

// middlewares
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan("common"));

app.use(homeRoutes);
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

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
