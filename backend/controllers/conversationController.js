const Conversation = require("../models/Conversation");

exports.postNewConversation = async (req, res, next) => {
  let convo = await Conversation.findOne({
    members: [req.body.senderId, req.body.receiverId],
  });
  convo = await Conversation.findOne({
    members: [req.body.receiverId, req.body.senderId],
  });
  console.log(convo);
  if (convo) {
    return;
  }

  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getConversation = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const conversation = await Conversation.find({
      members: { $in: [userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getConvoTwoUserId = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};
