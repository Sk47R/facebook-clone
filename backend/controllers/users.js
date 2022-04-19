const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.getIndex = (req, res, next) => {
  res.send("Hey its user root");
};

// update user
exports.putUpdateUser = async (req, res, next) => {
  const userId = req.body.userId;
  const password = req.body.password;
  if (userId === req.params.id || req.body.isAdmin) {
    if (password) {
      // user is trying to change the password
      try {
        req.body.password = await bcrypt.hash(password, 12);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(userId, { $set: req.body });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You cannot updated other's Account");
  }
};

//detele user
exports.deleteUser = async (req, res, next) => {
  const userId = req.params.id;
  if (req.body.userId === userId || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(userId);
      res.status(200).json("Account has been deleted Succcessfully");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You cannot delete other's Account");
  }
};

// get a user
exports.getUser = (req, res, next) => {
  const userId = req.params.id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        console.log("No user found from getUser");
      }
      const { password, updatedAt, ...other } = user._doc;
      // ._doc carries all the docs
      res.status(200).json(other);
    })
    .catch((err) => {
      console.log("getting user failed", err);
      res.status(500).json(err);
    });
};
// get a user by username
exports.getUserUsername = (req, res, next) => {
  const username = req.query.username;

  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        console.log("No user found from getUser");
      }
      const { password, updatedAt, ...other } = user._doc;
      // ._doc carries all the docs
      res.status(200).json(other);
    })
    .catch((err) => {
      console.log("getting user failed", err);
      res.status(500).json(err);
    });
};

// follow the user
exports.putFollowUser = async (req, res, next) => {
  const userId = req.params.id;
  if (req.body.userId !== userId) {
    try {
      const user = await User.findById(userId); // user we are trying to follow
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: userId } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("You already follow this account.");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    // same user
    res.status(403).json("You Cannot Follow Yourself!");
  }
};

// unfollowing

exports.putUnfollow = async (req, res, next) => {
  const userId = req.params.id;
  if (req.body.userId !== userId) {
    try {
      const user = await User.findById(userId); // user we are trying to follow
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        // we unfollow if the user has been followed
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: userId } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("You have already unfollowed this account.");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    // same user
    res.status(403).json("You Cannot unFollow Yourself!");
  }
};

exports.getFriends = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json(err);
  }
};
