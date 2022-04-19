import "./Post.css";
import { MoreHoriz } from "@mui/icons-material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAction } from "../../actions/userAction";
import { useEffect } from "react";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { likeAction } from "../../actions/likeAction";

const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);

  useEffect(() => {
    setIsLiked(post.likes.includes(user._id));
  }, [user._id, post.likes]);

  useEffect(() => {
    dispatch(getUserAction(post.userId));
  }, [post.userId]);

  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const likeHandler = () => {
    dispatch(likeAction(post._id, user?._id));
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked((prev) => !prev);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                src={
                  user?.profilePicture
                    ? PublicFolder + user?.profilePicture
                    : PublicFolder + "person/noAvatar.png"
                }
                className="postProfileImg"
                alt=""
              />
            </Link>
            <div className="postTopLeftName">
              <span className="postUsername">{user.username}</span>
              <span className="postDate">{format(post.createdAt)}</span>
            </div>
          </div>
          <div className="postTopRight">
            <MoreHoriz className="postTopRightIcon" />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.description}</span>
          {/* conditional rendering */}
          <img className="postImage" src={PublicFolder + post?.img} alt="" />
        </div>

        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PublicFolder}like.png`}
              alt=""
              onClick={likeHandler}
            />
            <img
              className="likeIcon"
              src={`${PublicFolder}heart.png`}
              alt=""
              onClick={likeHandler}
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
