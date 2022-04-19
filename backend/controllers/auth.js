const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getAuth = (req, res, next) => {
  res.send("This is auth");
};

// Register
exports.postRegister = (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        username: username,
        email: email,
        password: hashedPassword,
      });
      return user.save();
    })
    .then((user) => {
      console.log("user registered successfully");
      // token generator
      // let token;
      // try {
      //   token = jwt.sign(
      //     {
      //       userId: user._id,
      //       email: user.email,
      //     },
      //     "secretkey_dont_share",
      //     { expiresIn: "1h" }
      //   );

      //   res.status(201).json({
      //     message: "User Registered",
      //     user: { ...user, token: token },
      //   });
      // } catch (err) {
      //   console.log(err);
      // }
    })
    .catch((err) => {
      //   if (!err.statusCode) {
      //     err.statusCode = 500;
      //   }
      //   next(err);
      console.log("error while registering user");
      res.status(500).json(err);
    });
};

// Login
exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        res.status(404).json("User not found");
        console.log("User with the email not found");
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        // User entered wrong password
        res.status(400).json("Wrong Password");
      }
      // password success now creating a token
      // let token;
      // try {
      //   token = jwt.sign(
      //     {
      //       userId: loadedUser._id,
      //       email: loadedUser.email,
      //     },
      //     "secretkey_dont_share",
      //     { expiresIn: "1h" }
      //   );
      // } catch (err) {
      //   console.log(err);
      // }

      res.status(200).json(loadedUser);
    })
    .catch((err) => {
      console.log("Error from login", err);
      res.status(500).json(err);
    });
};
