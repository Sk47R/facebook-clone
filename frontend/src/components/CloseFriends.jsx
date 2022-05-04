import "./CloseFriends.css";
const CloseFriends = ({ user }) => {
  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <li className="sidebarFriend">
      <img
        className="sidebarFriendImg"
        src={PublicFolder + user?.profilePicture}
        alt=""
      />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
};

export default CloseFriends;
