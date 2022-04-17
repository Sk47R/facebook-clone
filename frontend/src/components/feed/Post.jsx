import "./Post.css";
import { MoreHoriz } from "@mui/icons-material";
import { Users } from "../../dummyData";
import { useState } from "react";

const Post = ({ post }) => {
  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);

  const user = Users.filter((user) => user.id === 1);

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked((prev) => !prev);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              src={
                Users.filter((user) => user.id === post.userId)[0]
                  .profilePicture
              }
              className="postProfileImg"
              alt=""
            />
            <div className="postTopLeftName">
              <span className="postUsername">
                {Users.filter((user) => user.id === post.userId)[0].username}
              </span>
              <span className="postDate">{post.date}</span>
            </div>
          </div>
          <div className="postTopRight">
            <MoreHoriz className="postTopRightIcon" />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.description}</span>
          {/* conditional rendering */}
          <img className="postImage" src={post.photo} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src="/assets/like.png"
              alt=""
              onClick={likeHandler}
            />
            <img
              className="likeIcon"
              src="/assets/heart.png"
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