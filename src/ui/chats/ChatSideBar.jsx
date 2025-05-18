import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { formatMessageTime, truncateText } from "../../utils/helpers";
import DataLoader from "../DataLoader";

const ChatSideBar = ({
  setShowChatsMenu,
  showChatsMenu,
  chats = [],
  targetChat,
  setTargetChat,
  isLoading = false,
}) => {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.authedUser);

  // Handler for selecting a chat
  const handleSelectChat = (chat) => {
    // Store chat parameters in sessionStorage
    sessionStorage.setItem("request_type", chat?.request_type);
    sessionStorage.setItem("request_id", chat?.request_id);
    sessionStorage.setItem("owner_id", chat?.owner_id);
    sessionStorage.setItem("applied_id", chat?.applied_id);

    // Update selected chat
    setTargetChat(chat);
    setShowChatsMenu(false);
  };

  return (
    <div className={`side-menu p-2 pt-3 ${showChatsMenu ? "active" : ""}`}>
      <div className="colse" onClick={() => setShowChatsMenu(false)}>
        <i className="fa-solid fa-circle-xmark"></i>
      </div>

      {isLoading ? (
        <div className="chat-loading">
          <DataLoader size="sm" />
        </div>
      ) : chats.length === 0 ? (
        <div className="no-chats">
          <p>{t("chat.noChatsFound")}</p>
        </div>
      ) : (
        chats.map((chat) => (
          <button
            className={`nav-link ${
              targetChat?.id === chat?.id ? "active" : ""
            }`}
            key={chat?.id}
            onClick={() => handleSelectChat(chat)}
          >
            <img
              className="userImg"
              src={
                chat?.apply
                  ? chat?.apply?.id === user?.id
                    ? chat?.owner?.image
                    : chat?.apply?.image || "/images/avatar.jpg"
                  : "/images/deleted-account.jpg"
              }
              alt="user"
            />
            <div className="text-wrap">
              <h6 className="name">
                {chat?.apply
                  ? chat?.apply?.id === user?.id
                    ? chat?.owner?.name
                    : chat?.apply?.name
                  : t("chat.deletedAccount")}
              </h6>
              <p className="lastMessage unread">
                {chat?.last_message?.type !== "text" ? (
                  <div className="icon">
                    <i className="fa-solid fa-paperclip"></i>
                    <span>{t("chat.attachment")}</span>
                  </div>
                ) : (
                  truncateText(chat?.last_message?.message, 35)
                )}
                {chat?.last_message?.from_id === user?.id && (
                  <span className="read">
                    {(chat?.apply?.id === user?.id &&
                      chat?.last_message?.is_read_owner === 1) ||
                    (chat?.apply?.id !== user?.id &&
                      chat?.last_message?.is_read_apply === 1) ? (
                      <i className="fa-regular fa-check-double"></i>
                    ) : (
                      <i className="fa-regular fa-check"></i>
                    )}
                  </span>
                )}
              </p>
              <span className="time" dir="ltr">
                {formatMessageTime(chat?.last_message?.created_at)}
              </span>
            </div>
          </button>
        ))
      )}
    </div>
  );
};

export default ChatSideBar;
