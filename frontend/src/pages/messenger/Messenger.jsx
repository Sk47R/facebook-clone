import "./Messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import useTokenAndId from "../../components/tokenFetch";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConversationAction } from "../../actions/getConversationAction";
import { getMessageAction } from "../../actions/getMessageAction";
import axios from "axios";
import { io } from "socket.io-client";

const Messenger = () => {
  const { conversations, loading: loadingConversations } = useSelector(
    (state) => state.conversations
  );

  const scrollRef = useRef();
  const [currentChat, setCurrentChat] = useState(null);
  const newMessage = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();
  const socket = useRef();

  const { user, token } = useTokenAndId();
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);
  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, []);

  useEffect(() => {
    dispatch(getConversationAction(user._id, token));
  }, [user._id, token, dispatch]);

  useEffect(() => {
    const apiUrl = `http://localhost:8800/api/messages/${currentChat?._id}`;
    const getMessages = async (token) => {
      return axios({
        url: apiUrl,
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => {
          if (response.status == 200) {
            setMessages(response.data);
          } else {
            console.log(response.data, "error");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getMessages(token);
  }, [currentChat]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("clicked");
    const message = {
      sender: user._id,
      text: newMessage.current.value,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId: receiverId,
      text: newMessage.current.value,
    });

    try {
      const res = await axios.post(
        `http://localhost:8800/api/messages`,
        message,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setMessages([...messages, res.data]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="messengerLeft">
          <div className="messengerLeftWrapper">
            <input
              type="text"
              placeholder="Search for firends"
              className="messengerLeftWrapper__Input"
            />
            {loadingConversations ? (
              <h1>Loading...</h1>
            ) : (
              conversations.map((conversation) => {
                return (
                  <div onClick={() => setCurrentChat(conversation)}>
                    <Conversation
                      conversation={conversation}
                      key={conversation._id}
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div className="messengerCenter">
          <div className="messengerCenterWrapper">
            {currentChat ? (
              <>
                <div className="messengerCenterWrapperTop">
                  {messages.length > 0 ? (
                    messages.map((message) => {
                      return (
                        <div ref={scrollRef}>
                          <Message
                            message={message}
                            own={message.sender === user._id}
                            key={message._id}
                          />
                        </div>
                      );
                    })
                  ) : (
                    <h2>No messages to show</h2>
                  )}
                </div>
                <div className="messengerCenterWrapperBottom">
                  <textarea
                    placeholder="write something..."
                    className="chatMessageInput"
                    ref={newMessage}
                  ></textarea>
                  <button onClick={handleSubmit} className="chatSubmitButton">
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat
              </span>
            )}
          </div>
        </div>
        <div className="messengerRight">
          <div className="messengerRightWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
              key={onlineUsers._id}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
