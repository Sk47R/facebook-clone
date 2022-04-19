import "./Feed.css";
import Share from "./Share";
import Post from "./Post";
import { Posts } from "../../dummyData";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTimelinePost } from "../../actions/postTimeLineAction";
import { getUserPostAction } from "../../actions/userPostAction";

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const timelinePost = useSelector((state) => state.timelinePost.posts);
  const user = useSelector((state) => state.login.user);
  const userPosts = useSelector((state) => state.userPost.userPosts);
  useEffect(() => {
    dispatch(getTimelinePost(user?._id));
    if (username) {
      dispatch(getUserPostAction(username));
    }
  }, [username, user?._id]);
  return (
    <div className="feed">
      <div className="feedWrapper">
        {username ? username === user.username && <Share /> : <Share />}
        {username
          ? userPosts
              .sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
              })
              .map((item) => {
                return <Post post={item} key={item._id} />;
              })
          : timelinePost
              .sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
              })
              .map((item) => {
                return <Post post={item} key={item._id} />;
              })}
      </div>
    </div>
  );
};

export default Feed;
