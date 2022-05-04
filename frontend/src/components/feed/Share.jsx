import "./Share.css";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { createPostAction } from "../../actions/createPostAction";
import axios from "axios";
import useTokenAndId from "../tokenFetch";

const Share = () => {
  const dispatch = useDispatch();
  // const { posts, loading, error } = useSelector((state) => state.createPost);

  const { user, token } = useTokenAndId();

  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      description: description,
      image: file,
    };

    dispatch(createPostAction(newPost, token));
    // window.location.reload();

    setDescription("");
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={
              user?.profilePicture
                ? PublicFolder + user?.profilePicture
                : PublicFolder + "person/noAvatar.png"
            }
            className="shareProfileImg"
            alt=""
          />
          <input
            type="text"
            placeholder={`What's on your mind, ${user.username}?`}
            className="shareInput"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <hr className="shareHr" color="lightgrey" />
        {file && (
          <div className="shareImageContainer">
            <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="#00A400" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                name="file"
                accept=".png,.jpeg,.jpg,.svg"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </label>
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
          <button className="shareButton" type="submit">
            Share Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Share;
