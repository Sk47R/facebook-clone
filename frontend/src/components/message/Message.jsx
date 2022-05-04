import "./Message.css";
import { format } from "timeago.js";
const Message = ({ message, own }) => {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          src="https://pbs.twimg.com/media/D8Dp0c5WkAAkvME.jpg"
          alt=""
          className="messageImg"
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
};

export default Message;
