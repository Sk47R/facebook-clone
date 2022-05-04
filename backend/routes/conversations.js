const express = require("express");

const router = express.Router();
const conversationController = require("../controllers/conversationController");
const auth = require("../middleware/auth");

//new conv
router.post("/", conversationController.postNewConversation);

//get conv of a user
router.get("/:userId", conversationController.getConversation);

//get conv includes two userid
router.get(
  "/find/:firstUserId/:secondUserId",
  conversationController.getConvoTwoUserId
);

module.exports = router;
