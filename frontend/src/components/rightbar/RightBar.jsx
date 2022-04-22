import "./RightBar.css";
import { Users } from "../../dummyData";
import Online from "./Online";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Add, Remove } from "@mui/icons-material";
import { followFriendAction } from "../../actions/followUnfollow";
import { unFollowFriendAction } from "../../actions/followUnfollow";
import useTokenAndId from "../tokenFetch";

const RightBar = ({ user }) => {
  const dispatch = useDispatch();
  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: loggedUser } = useTokenAndId();

  const [followed, setFollowed] = useState(
    loggedUser?.followings?.includes(user?._id)
  );
  useEffect(() => {
    setFollowed(loggedUser?.followings?.includes(user?._id));
  }, [user?._id]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        let friendList;

        friendList = await axios.get(
          `http://localhost:8800/api/users/friends/${user?._id}`
        );

        setFriends(friendList.data);
      } catch (err) {
        console.log("fetching users friends error");
        console.log(err);
      }
    };
    if (user) {
      getFriends();
    }
  }, [user]);

  const followHandler = async () => {
    try {
      if (followed) {
        await axios.put(
          `http://localhost:8800/api/users/${user._id}/unfollow`,
          {
            userId: loggedUser._id,
          }
        );
        dispatch(unFollowFriendAction(user._id));
      } else {
        await axios.put(`http://localhost:8800/api/users/${user._id}/follow`, {
          userId: loggedUser._id,
        });
        dispatch(followFriendAction(user._id));
      }
      setFollowed(!followed);
    } catch (err) {
      console.log(err);
    }
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src="/assets/gift.png" className="birthdayImg" alt="" />
          <span className="birthdayText">
            <strong>John Doe</strong> and <strong>3 other friends</strong> have
            a birthday today.
          </span>
        </div>
        <img src="/assets/ad.png" alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {/* loop over this */}
          {Users.map((user) => (
            <Online key={user.id} user={user} />
          ))}
          {/* loop over this */}
        </ul>
      </>
    );
  };

  const ProfileRightBar = () => {
    return (
      <>
        {user.username !== loggedUser.username && (
          <button className="rightbarFollowButton" onClick={followHandler}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : ""}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((firend) => {
            return (
              <Link
                to={`/profile/${firend.username}`}
                key={firend._id}
                style={{ textDecoration: "none" }}
              >
                <div className="rightbarFollowing">
                  <img
                    src={
                      firend.profilePicture
                        ? PublicFolder + firend.profilePicture
                        : PublicFolder + "person/noAvatar.png"
                    }
                    alt=""
                    className="rightbarFollowingImage"
                  />
                  <span className="rightbarFollowingName">
                    {firend.username}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightBar /> : <HomeRightbar />}
      </div>
    </div>
  );
};

export default RightBar;
