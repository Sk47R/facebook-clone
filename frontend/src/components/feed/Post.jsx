import "./Post.css";
import { MoreHoriz } from "@mui/icons-material";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAction } from "../../actions/userAction";
import { useEffect } from "react";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { likeAction } from "../../actions/likeAction";
import useTokenAndId from "../tokenFetch";
import EditIcon from "@mui/icons-material/Edit";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { PermMedia } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import Modal from "../Modal/Modal";

const Post = ({ post, username }) => {
  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const postUser = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [updatePost, setUpdatePost] = useState({});
  const [file, setFile] = useState(null);
  const description = useRef("");
  const { user, token } = useTokenAndId();
  const userId = user._id;
  const [openMore, setOpenMore] = useState(false);
  useEffect(() => {
    setIsLiked(post.likes.includes(user._id));
  }, [user._id, post.likes]);

  useEffect(() => {
    dispatch(getUserAction(post.userId));
  }, [post.userId]);

  const likeHandler = () => {
    dispatch(likeAction(post._id, user?._id));
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked((prev) => !prev);
  };

  const editHandler = (postId) => {
    axios
      .get(`http://localhost:8800/api/posts/${postId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setUpdatePost(res.data);
      })
      .catch((err) => {
        console.log("postdelete failed");
      });
    setEditModal(true);
    setOpenMore(false);
  };
  const closeEdit = () => {
    setEditModal(false);
    setFile(null);
  };
  const deletePostHandler = (postId) => {
    axios
      .delete(
        `http://localhost:8800/api/posts/${postId}`,
        { data: { userId: userId } },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log("post delete success");
      })
      .catch((err) => {
        console.log("postdelete failed");
      });
    console.log("deleted");
    window.location.reload();
  };

  const submitHandler = (postId) => {
    const userId = user._id;
    const updatedDescription = description.current.value;
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("description", updatedDescription);
    formData.append("image", file ? file : updatePost.img);
    axios
      .put(`http://localhost:8800/api/posts/${postId}`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.status == 200) {
          console.log("like success");
        } else {
          console.log("update failed");
        }
      })
      .catch((err) => {
        console.log("Errro");
      });
    console.log("success");
  };

  const TimelineModal = () => {
    return (
      <div className="modal_timeline">
        <div className="modal_item">
          <div className="modal_item_Left">
            <BookmarkIcon className="modal_item_Left_Icon" />
          </div>
          <div className="modal_item_right">
            <span className="modal_item_Left_Text">Save post</span>
          </div>
        </div>
      </div>
    );
  };

  const ProfileModal = () => {
    return (
      <div className="modal_profile">
        <div
          className="modal_item"
          onClick={() => {
            editHandler(post._id);
          }}
        >
          <div className="modal_item_Left">
            <EditIcon className="modal_item_Left_Icon" />
          </div>
          <div className="modal_item_right">
            <span className="modal_item_Left_Text">Edit Post</span>
          </div>
        </div>
        <div className="modal_item">
          <div className="modal_item_Left">
            <BookmarkIcon className="modal_item_Left_Icon" />
          </div>
          <div className="modal_item_right">
            <span className="modal_item_Left_Text">Save post</span>
          </div>
        </div>
        <div
          className="modal_item"
          onClick={() => {
            deletePostHandler(post._id);
          }}
        >
          <div className="modal_item_Left">
            <DeleteOutlineIcon className="modal_item_Left_Icon" />
          </div>
          <div className="modal_item_right">
            <span className="modal_item_Left_Text">Delete post</span>
          </div>
        </div>
      </div>
    );
  };
  const EditModal = () => {
    return (
      <Modal onClick={closeEdit}>
        <div className="EditModal">
          <CloseIcon onClick={closeEdit} className="EditModal__Close" />
          {/* <CloseIcon
            className="EditModal__Close__Image"
            onClick={setFile(null)}
          /> */}
          <div className="EditModal__Top">
            <h3>Edit Post</h3>
          </div>
          <div className="container">
            <form
              onSubmit={() => {
                submitHandler(post._id);
              }}
            >
              <div className="EditModal__Top__Content">
                <input
                  className="EditModal__Top__Content__Input"
                  type="text"
                  defaultValue={updatePost.description}
                  ref={description}
                />
              </div>
              <div className="Edit_Image">
                <img
                  className="EditModal__Top__Content__Image"
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : PublicFolder + updatePost.img
                  }
                  style={{ marginBottom: "1rem" }}
                  alt="No image selected"
                />
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
              </div>
              <div className="Edit__Button">
                <button type="submit" className="Edit__Button__Btn">
                  Edit
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    );
  };
  return (
    <div className="post">
      {editModal && <EditModal />}
      {openMore && (username ? <ProfileModal /> : <TimelineModal />)}

      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                src={
                  user?.profilePicture
                    ? PublicFolder + user?.profilePicture
                    : PublicFolder + "person/noAvatar.png"
                }
                className="postProfileImg"
                alt=""
              />
            </Link>
            <div className="postTopLeftName">
              <span className="postUsername">{postUser?.username}</span>
              <span className="postDate">{format(post.createdAt)}</span>
            </div>
          </div>
          <div className="postTopRight">
            <MoreHoriz
              className="postTopRightIcon"
              onClick={() => {
                setOpenMore((prev) => !prev);
              }}
            />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.description}</span>
          {/* conditional rendering */}
          <img className="postImage" src={PublicFolder + post?.img} alt="" />
          {/* <img className="postImage" src={PublicFolder + post?.img} alt="" /> */}
        </div>

        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PublicFolder}like.png`}
              alt=""
              onClick={likeHandler}
            />
            <img
              className="likeIcon"
              src={`${PublicFolder}heart.png`}
              alt=""
              onClick={likeHandler}
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
