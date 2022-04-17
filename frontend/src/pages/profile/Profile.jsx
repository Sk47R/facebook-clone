import "./Profile.css";
import Topbar from "../../components/topbar/Topbar";
import SideBar from "../../components/sidebar/SideBar";
import Feed from "../../components/feed/Feed";
import RightBar from "../../components/rightbar/RightBar";
const Profile = () => {
  return (
    <>
      <Topbar />
      <div className="profile">
        <SideBar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src="/assets/post/3.jpeg"
                className="profileCoverImage"
                alt=""
              />
              <img
                src="/assets/person/7.jpeg"
                className="profileUserImage"
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">John Doe</h4>
              <span className="profileInfoDesc">Hello, love once</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed />
            <RightBar profile />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
