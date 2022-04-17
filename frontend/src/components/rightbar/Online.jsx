import "./Online.css";
const Online = ({ user }) => {
  return (
    <li className="rightBarFriend">
      <div className="rightbarProfileImgContainer">
        <img
          src={user.profilePicture}
          alt=""
          className="rightbarProfileImage"
        />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{user.username}</span>
    </li>
  );
};

export default Online;
