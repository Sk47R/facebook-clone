import axios from "axios";
import { useEffect, useState } from "react";
import "./ChatOnline.css";
import useTokenAndId from "../tokenFetch";

const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {
  const { token } = useTokenAndId();
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getFriends = async (token) => {
      const apiUrl = `http://localhost:8800/api/users/friends/${currentId}`;
      const res = await axios({
        url: apiUrl,
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });
      setFriends(res.data);
    };

    getFriends(token);
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(
      friends.filter((friend) => onlineUsers.includes(friend._id))
    );
  }, [friends, onlineUsers]);
  console.log(onlineFriends);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `http://localhost:8800/api/conversations/find/${currentId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends.map((friend) => (
        <div
          className="chatOnlineFriend"
          onClick={() => {
            handleClick(friend);
          }}
        >
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={
                friend.profilePicture
                  ? PublicFolder + friend.profilePicture
                  : PublicFolder + "person/noAvatar.png"
              }
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">John Doe</span>
        </div>
      ))}
    </div>
  );
};

export default ChatOnline;
