import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import useRealTimeChat from "../../hooks/chats/useRealTimeChat";
import { formatMessageTime } from "../../utils/helpers";
import DataLoader from "../DataLoader";
import MessageInput from "./MessageInput";

const ChatRoom = ({ chat }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const chatContainerRef = useRef(null);
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.authedUser);

  // Initialize real-time chat functionality
  const { isConnected, markMessagesAsRead } = useRealTimeChat(
    chat,
    messages,
    setMessages
  );

  useEffect(() => {
    if (chat) {
      setIsLoading(true);
      setMessages(chat?.messages?.slice() || []);
      setIsLoading(false);

      // Mark messages as read when chat is opened
      markMessagesAsRead();
    }
  }, [chat, markMessagesAsRead]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Function to handle new messages from other users
  function pushMessage(message) {
    if (message?.from_id === user?.id) {
      return;
    }
    setMessages((prevMessages) => {
      return [...prevMessages, message];
    });
  }

  // Handle new message sent by current user
  const handleMessageSent = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const extractTextAfterMessages = (url) => {
    const regex = /_messages\.(.*)/;
    const match = url.match(regex);
    return match ? match[1] : fileName;
  };

  return (
    <div className="chat-container">
      <div className="chat-head">
        <div className="user">
          <img
            src={
              chat?.apply
                ? user?.id === chat?.apply?.id
                  ? chat?.owner?.image
                  : chat?.apply?.image || "/images/avatar.jpg"
                : "/images/deleted-account.jpg"
            }
            alt="user"
          />
          <h6 className="name">
            {chat?.apply
              ? user?.id === chat?.apply?.id
                ? chat?.owner?.name
                : chat?.apply?.name
              : t("chat.deletedAccount")}
          </h6>
          {isConnected && <span className="connection-status connected"></span>}
        </div>
      </div>

      {chat?.service && (
        <Link to={`/services/${chat?.service?.id}`} className="adItem">
          <img src={chat?.service?.image || "/images/bann.webp"} alt="" />
          <p>{chat?.service?.title}</p>
        </Link>
      )}

      {chat?.project && (
        <Link to={`/projects/${chat?.project?.id}`} className="adItem">
          <p>{chat?.project?.title}</p>
        </Link>
      )}

      <div className="inner-container" ref={chatContainerRef}>
        {isLoading ? (
          <div className="loading-messages">
            <DataLoader size="sm" />
          </div>
        ) : messages.length === 0 ? (
          <div className="no-messages">
            <p>{t("chat.noMessagesYet")}</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              className={`message ${
                message?.from_id === user?.id
                  ? "sent-message"
                  : "received-message"
              }`}
              key={message?.id}
            >
              <div className="d-flex flex-column">
                <div className="message-content">
                  {message?.type === "text" && <p>{message?.message}</p>}
                  {message?.type === "audio" && (
                    <audio controls src={message?.message} />
                  )}
                  {message?.type === "image" && (
                    <img
                      style={{
                        aspectRatio: 1 / 1,
                        width: "300px",
                        objectFit: "contain",
                      }}
                      src={message?.message}
                      alt=""
                    />
                  )}
                  {message?.type === "file" && (
                    <Link to={message?.message} target="_blank">
                      <div className="doc_message">
                        <p>{extractTextAfterMessages(message?.message)}</p>
                        <div className="icon">
                          <i className="fa-regular fa-file"></i>
                        </div>
                      </div>
                    </Link>
                  )}
                </div>
                <span
                  dir="ltr"
                  className={message?.from_id === user?.id ? "sen" : "rec"}
                >
                  {formatMessageTime(message?.created_at)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <MessageInput
        chatId={chat?.id}
        userId={user?.id}
        onMessageSent={handleMessageSent}
      />
    </div>
  );
};

export default ChatRoom;
