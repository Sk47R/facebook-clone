import "./RightBar.css";
import { Users } from "../../dummyData";
import Online from "./Online";

const RightBar = ({ profile }) => {
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
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">Lalitpur</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">Mangalbazzar</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">Taken</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img
              src="/assets/person/1.jpeg"
              alt=""
              className="rightbarFollowingImage"
            />
            <span className="rightbarFollowingName">John Doe</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="/assets/person/1.jpeg"
              alt=""
              className="rightbarFollowingImage"
            />
            <span className="rightbarFollowingName">John Doe</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="/assets/person/1.jpeg"
              alt=""
              className="rightbarFollowingImage"
            />
            <span className="rightbarFollowingName">John Doe</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="/assets/person/1.jpeg"
              alt=""
              className="rightbarFollowingImage"
            />
            <span className="rightbarFollowingName">John Doe</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="/assets/person/1.jpeg"
              alt=""
              className="rightbarFollowingImage"
            />
            <span className="rightbarFollowingName">John Doe</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="/assets/person/1.jpeg"
              alt=""
              className="rightbarFollowingImage"
            />
            <span className="rightbarFollowingName">John Doe</span>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightBar /> : <HomeRightbar />}
      </div>
    </div>
  );
};

export default RightBar;
