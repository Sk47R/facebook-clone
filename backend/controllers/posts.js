const Post = require("../models/Post");
const User = require("../models/User");
const fs = require("fs");
const path = require("path");
exports.getPosts = (req, res, next) => {
  console.log("post page");
};
exports.createPost = (req, res, next) => {
  if (!req.file) {
    console.log("no file provided");
  }
  const imgUrl = req.file.path.split("/")[2];

  const newPost = new Post({
    userId: req.body.userId,
    description: req.body.description,
    img: imgUrl,
    creator: req.userId,
    ...req.body,
  }); // we pass everything that is required for a post

  newPost
    .save()
    .then((post) => {
      console.log("post created successfully");
      res.status(200).json(post);
    })
    .catch((err) => {
      console.log("Creating new post failed");
      res.status(500).json(err);
    });
};

exports.updatePost = async (req, res, next) => {
  try {
    console.log("update post");
    const postId = req.params.id;
    let imageUrl = req.body.image;
    console.log(req.file);
    if (req.file) {
      imageUrl = req.file.path.split("/")[2];
    }
    console.log(imageUrl);
    if (!imageUrl) {
      console.log("no file");
    }
    const post = await Post.findById(postId);
    let postImg = post.img;
    console.log("here");
    if (post.userId == req.body.userId) {
      await post.updateOne({ $set: { ...req.body, img: imageUrl } });
      res.status(200).json("The post has been updated!");
      if (imageUrl !== postImg) {
        // we uploaded a new file
        clearImage(postImg);
      }
      console.log("update successfull");
      //   this check does is, if userId of the post is equal to the id of the user that want to update the post
    } else {
      console.log("u connot ");
      res.status(403).json("You cannot update other's post!");
    }
  } catch (err) {
    console.log("error");
    res.status(500).json(err);
  }
};

// delete post

exports.deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      clearImage(post.img);
      res.status(200).json("The post has been deleted!");
      //   this check does is, if userId of the post is equal to the id of the user that want to update the post
    } else {
      console.log("tour ganno");
      res.status(403).json("You cannot delete other's post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.putLike = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("Post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("Post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// get single post
exports.getPost = (req, res, next) => {
  const postId = req.params.id;
  Post.findById(postId)
    .then((post) => {
      if (!post) {
        res.status(404).json("post not found");
      }
      res.status(200).json(post);
    })
    .catch((err) => {
      console.log("fetching single post failed");
      res.status(500).json(err);
    });
};

// Timeline posts
exports.getTimelinePost = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const currentUser = await User.findById(userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
    // here what we do is for timeline. first we find the current user and get the posts of the current user. then we find the posts of the firedns of ours.
  } catch (err) {
    res.status(500).json(err);
  }
};
//get users post
exports.getUserPost = async (req, res, next) => {
  try {
    let userPost;
    const username = req.params.username;
    const user = User.findOne({ username: username })
      .then((result) => {
        return Post.find({ userId: result.id });
      })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", "public", "images", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
