const express = require("express");

const router = express.Router();
const userController = require("../controllers/users");

router.get("/", userController.getIndex);
// update user
router.put("/:id", userController.putUpdateUser);
// delete user
router.delete("/:id", userController.deleteUser);
// get a user
router.get("/:id", userController.getUser);
// follow a user
router.put("/:id/follow", userController.putFollowUser);
// unfollow a user
router.put("/:id/unfollow", userController.putUnfollow);
module.exports = router;
