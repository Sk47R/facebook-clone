const express = require("express");
const Message = require("../models/Message");

const router = express.Router();
const messageController = require("../controllers/messageController");
const auth = require("../middleware/auth");

// add
router.post("/", messageController.postNewMessage);

//get

router.get("/:conversationId", messageController.getMessage);

module.exports = router;
