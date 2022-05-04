import { useEffect } from "react";
import "./Conversation.css";
import useTokenAndId from "../tokenFetch";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUserAction } from "../../actions/userAction";

const Conversation = ({ conversation }) => {
  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const { loading, user: userFriend } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { token, user: currentUser } = useTokenAndId();

  useEffect(() => {
    // finding the information of the friend with the help of id
    const friendId = conversation.members.find(
      (member) => member !== currentUser._id
    );
    dispatch(getUserAction(friendId, token));
  }, [currentUser._id]);
  console.log(userFriend.username);
  return loading ? (
    <h2>lOading...</h2>
  ) : (
    <div className="conversation">
      <img
        src={
          userFriend.profilePicture
            ? userFriend.profilePicture
            : PublicFolder + "person/noAvatar.png"
        }
        alt=""
        className="conversationImg"
      />
      <span className="conversationName">{userFriend.username}</span>
    </div>
  );
};

export default Conversation;
