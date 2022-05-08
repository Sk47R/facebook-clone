import { useEffect, useState } from "react";
import "./Conversation.css";
import useTokenAndId from "../tokenFetch";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUserAction } from "../../actions/userAction";

const Conversation = ({ conversation }) => {
  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  // const { loading, user: userFriend } = useSelector((state) => state.user);
  const [userFriend, setUserFriend] = useState([]);
  const dispatch = useDispatch();
  const { token, user: currentUser } = useTokenAndId();
  useEffect(() => {
    // finding the information of the friend with the help of id
    const friendId = conversation.members.find(
      (member) => member !== currentUser._id
    );
    // dispatch(getUserAction(friendId, token));
    axios({
      url: `http://localhost:8800/api/users/${friendId}`,
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (response.status == 200) {
          setUserFriend(response.data);
        } else {
          console.log("error");
        }
      })
      .catch((err) => {
        console.log("error");
      });
  }, [currentUser._id]);
  return (
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
