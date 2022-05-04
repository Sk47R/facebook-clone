import "./Profile.css";
import Topbar from "../../components/topbar/Topbar";
import SideBar from "../../components/sidebar/SideBar";
import Feed from "../../components/feed/Feed";
import RightBar from "../../components/rightbar/RightBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserUsernameAction } from "../../actions/userUserNameAction";
import { useParams } from "react-router-dom";
import useTokenAndId from "../../components/tokenFetch";
const Profile = () => {
  console.log("profile rendered");
  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const dispatch = useDispatch();
  const { username } = useParams();
  const user = useSelector((state) => state.user.user);
  const userName = useSelector((state) => state.userUsername.user);
  const { user: loggedUser } = useTokenAndId();
  useEffect(() => {
    dispatch(getUserUsernameAction(username));
  }, [username, dispatch]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <SideBar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={
                  loggedUser
                    ? loggedUser?.coverPicture
                      ? PublicFolder + loggedUser?.coverPicture
                      : PublicFolder + "person/noBackground.jpeg"
                    : user?.coverPicture
                    ? PublicFolder + user?.coverPicture
                    : PublicFolder + "person/noBackground.jpeg"
                }
                className="profileCoverImage"
                alt=""
              />
              <img
                src={
                  loggedUser
                    ? loggedUser?.profilePicture
                      ? PublicFolder + loggedUser?.profilePicture
                      : PublicFolder + "person/noAvatar.png"
                    : user?.profilePicture
                    ? PublicFolder + user?.profilePicture
                    : PublicFolder + "person/noAvatar.png"
                }
                className="profileUserImage"
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{username}</h4>
              <span className="profileInfoDesc">
                {user.description || "New To Facebook"}
              </span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <RightBar user={userName} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
