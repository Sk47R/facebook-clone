const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    //   not authenticated as no header
    // const error = new Error("Not Authenticated");

    // error.statusCode = 401;
    // throw error;
    res.json("Not Authenticated");
    console.log("Authentication failed");
  }

  const token = authHeader.split(" ")[1];
  // with get method we can get header value
  //   here we did a split because the token has baerer in front when we made the header in the front end.

  //// Now decode token
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "secretkey_dont_share");
    //verify function decodes the token and verifies it as well
    // here the secretkey must be the same secretkey we added when we create the token in auth.js controller
  } catch (err) {
    // decoding may fail
    // err.statusCode = 500;
    res.json(" Decoding failed");

    // throw err;
    console.log("decoding failed");
  }

  if (!decodedToken) {
    //   token is not verified
    // const error = new Error("Not Authenticated");
    // error.statusCode = 401;
    // throw error;
    console.log("token is not calue");
    res.json("token is not valid");
  }

  //   now we have a valid token
  req.userId = decodedToken.userId; // storing the userId of the token to the req.userId. This will be usefull when authorizing
  next();
};
