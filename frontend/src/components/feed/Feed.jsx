import "./Feed.css";
import Share from "./Share";
import Post from "./Post";
import { Posts } from "../../dummyData";

const Feed = () => {
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {Posts.map((item) => {
          return <Post post={item} key={item.id} />;
        })}
      </div>
    </div>
  );
};

export default Feed;
