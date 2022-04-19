import "./Online.css";
const Online = ({ user }) => {
  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <li className="rightBarFriend">
      <div className="rightbarProfileImgContainer">
        <img
          src={PublicFolder + user.profilePicture}
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
