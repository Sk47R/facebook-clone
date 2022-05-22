const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const validator = require("validator");

exports.getAuth = (req, res, next) => {
  res.send("This is auth");
};

// Register
exports.postRegister = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const city = req.body.city;
  const location = req.body.location;
  const relation = req.body.relation;
  const password = req.body.password;

  const error = {};

  if (password) {
    if (password.length < 6) {
      error.password =
        "Password is too short, it must contain atleast 6 characters.";
    }
  } else {
    error.password = "Password is required.";
  }

  if (email) {
    if (validator.isEmail(email)) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        error.email = "Email address already exists.";
      }
    } else {
      error.email = "Please enter a valid email.";
    }
  } else {
    error.email = "Email is required.";
  }

  if (username) {
    const usernameExists = await User.findOne({ username: username });
    if (usernameExists) {
      error.username = "Username already exists.";
    }
  } else {
    error.username = "Username is required.";
  }

  if (!city) {
    error.city = "Please enter your City.";
  }
  if (!location) {
    error.location = "Please enter your Location.";
  }
  if (!relation) {
    error.relation = "Please choose 1 or 2 or 3";
  }

  if (!_.isEmpty(error)) {
    return res.status(400).send(error);
  }

  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        username: username,
        email: email,
        city: city,
        location: location,
        relation: relation,
        password: hashedPassword,
      });
      return user.save();
    })
    .then((user) => {
      console.log("user registered successfully");
      // token generator
      let token;
      try {
        token = jwt.sign(
          {
            userId: user._id,
            email: user.email,
          },
          process.env.SECRET_KEY,
          { expiresIn: "1h" }
        );

        res.status(201).json({
          user: user,
          token: token,
        });
      } catch (err) {
        console.log(err);
      }
    })
    .catch((err) => {
      console.log("error while registering user");
      res.status(500).json(err);
    });
};

// Login
exports.postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let error = {};
  if (email) {
    const emailExists = await User.findOne({ email: email });
    if (!emailExists) {
      error.email = "This email does'nt exists.";
    }
  } else {
    error.email = "Email is required.";
  }

  if (password) {
    const user = await User.findOne({ email });
    if (user) {
      const valid = await bcrypt.compare(password, user?.password);
      if (valid == false) {
        error.password = "Incorrect Password. Please try again.";
      }
    }
  } else {
    error.password = "Password is required.";
  }
  if (!_.isEmpty(error)) {
    return res.status(400).send(error);
  }

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
      let token;
      try {
        token = jwt.sign(
          {
            userId: loadedUser._id,
            email: loadedUser.email,
          },
          process.env.SECRET_KEY,
          { expiresIn: "1h" }
        );
      } catch (err) {
        console.log(err);
      }

      res.status(200).json({
        user: loadedUser,
        token: token,
      });
    })
    .catch((err) => {
      console.log("Error from login", err);
      res.status(500).json(err);
    });
};
