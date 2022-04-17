import "./Share.css";
import { PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material";

const Share = () => {
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img src="/assets/person/1.jpeg" className="shareProfileImg" alt="" />
          <input
            type="text"
            placeholder="What's on your mind, Sujan?"
            className="shareInput"
          />
        </div>
        <hr className="shareHr" color="lightgrey" />
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              <PermMedia htmlColor="#00A400" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
            </div>
            <div className="shareOption">
              <Label htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="#F5C33B" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="#F35369" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton">Share Now</button>
        </div>
      </div>
    </div>
  );
};

export default Share;
