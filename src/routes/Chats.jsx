import React, { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import chatAnimation from "../assets/lotties/chat.json";
import useGetChats from "../hooks/chats/useGetChats";
import useGetChat from "../hooks/chats/useGetChat";
import DataLoader from "../ui/DataLoader";
import Lottie from "react-lottie";
import ChatSideBar from "../ui/chats/ChatSideBar";
import ChatRoom from "../ui/chats/ChatRoom";

const Chats = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: chatAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { t } = useTranslation();
  const [showChatsMenu, setShowChatsMenu] = useState(false);
  const [targetChat, setTargetChat] = useState(null);

  // Get chat list
  const { data: chats, isLoading: isChatsLoading } = useGetChats();

  // Memoize chat parameters to prevent unnecessary re-renders
  const chatParams = useMemo(
    () => ({
      request_type: sessionStorage.getItem("request_type"),
      owner_id: sessionStorage.getItem("owner_id"),
      applied_id: sessionStorage.getItem("applied_id"),
      request_id: sessionStorage.getItem("request_id"),
    }),
    []
  );

  // Get specific chat data
  const { data: chat, isLoading: isChatLoading } = useGetChat(chatParams);

  // Update target chat when chat data changes
  useEffect(() => {
    if (chat?.id) {
      setTargetChat(chat);
    } else {
      setTargetChat(null);
    }
  }, [chat]);

  // Determine if any loading state is active
  const isLoading = isChatsLoading || (isChatLoading && chatParams.request_id);

  // Render the chat interface
  if (isLoading) {
    return <DataLoader />;
  }

  return (
    <section className="chat-section">
      <div className="container d-block">
        {/* Mobile chat menu button */}
        <button className="openTaps" onClick={() => setShowChatsMenu(true)}>
          <i className="fa-light fa-comments"></i>
          <span> {t("chat.chats")} </span>
        </button>

        <div className="row">
          {/* Always render the sidebar for better UX */}
          <div className="col-lg-4 col-12 p-2">
            <ChatSideBar
              chats={chats || []}
              setTargetChat={setTargetChat}
              targetChat={targetChat}
              showChatsMenu={showChatsMenu}
              setShowChatsMenu={setShowChatsMenu}
              isLoading={isChatsLoading}
            />
          </div>

          <div className="col-lg-8 col-12 p-2">
            {targetChat ? (
              <ChatRoom chat={chat} />
            ) : (
              <div className="lottie_player_holder">
                <Lottie options={defaultOptions} height={250} width={250} />
                <p className="text-center mt-3">
                  {t("chat.selectConversation")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chats;
