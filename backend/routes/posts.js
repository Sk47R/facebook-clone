const express = require("express");

const router = express.Router();
const postController = require("../controllers/posts");
const auth = require("../middleware/auth");

router.get("/", postController.getPosts);

// create a post
router.post("/", postController.createPost);
// update a post
router.put("/:id", postController.updatePost);

// delete a post
router.delete("/:id", postController.deletePost);
// like a post
router.put("/:id/like", postController.putLike);
// get a post
router.get("/:id", postController.getPost);
// get timeline posts
router.get("/timeline/:userId", auth, postController.getTimelinePost);
router.get("/profile/:username", postController.getUserPost);
module.exports = router;
