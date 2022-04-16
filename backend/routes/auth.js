const express = require("express");

const router = express.Router();
const authController = require("../controllers/auth");

router.get("/", authController.getAuth);
router.post("/register", authController.postRegister);
router.post("/login", authController.postLogin);

module.exports = router;
