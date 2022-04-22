const Post = require("../models/Post");
const User = require("../models/User");

exports.getPosts = (req, res, next) => {
  console.log("post page");
};
exports.createPost = (req, res, next) => {
  console.log("front file", req.file);

  const newPost = new Post({
    userId: req.body.userId,
    description: req.body.description,
    ...req.body,
  }); // we pass everything that is required for a post
  console.log(newPost);
  console.log("Hellow");

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
    const postId = req.params.id;
    const post = await Post.findById(postId);
    console.log(req.body);
    if (post.userId == req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("The post has been updated!");
      //   this check does is, if userId of the post is equal to the id of the user that want to update the post
    } else {
      console.log("u connot ");
      res.status(403).json("You cannot update other's post!");
    }
  } catch (err) {
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
