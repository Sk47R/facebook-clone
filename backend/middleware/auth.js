const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    res.json("Not Authenticated");
    console.log("Authentication failed");
  }

  const token = authHeader.split(" ")[1];

  //// Now decode token
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "secretkey_dont_share");
  } catch (err) {
    res.json(" Decoding failed");
    console.log("decoding failed");
  }

  if (!decodedToken) {
    console.log("token is not calue");
    res.json("token is not valid");
  }

  //   now we have a valid token
  req.userId = decodedToken.userId; // storing the userId of the token to the req.userId. This will be usefull when authorizing
  next();
};
