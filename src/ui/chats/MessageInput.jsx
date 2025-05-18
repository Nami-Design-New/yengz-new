import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import useSendMessage from "../../hooks/chats/useSendMessage";

const MessageInput = ({ chatId, userId, onMessageSent }) => {
  const { t } = useTranslation();
  const { sendMessage, isPending } = useSendMessage();
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [fileName, setFileName] = useState("");
  const formRef = useRef(null);
  const recordingIntervalRef = useRef(null);

  const [message, setMessage] = useState({
    from_id: userId,
    chat_id: chatId,
    message: "",
    type: "",
  });

  // Clean up recording interval on unmount
  useEffect(() => {
    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    };
  }, []);

  // Update message when chatId or userId changes
  useEffect(() => {
    setMessage((prev) => ({
      ...prev,
      from_id: userId,
      chat_id: chatId,
    }));
  }, [chatId, userId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (
      !message.message ||
      (message.type === "text" && !message.message.trim())
    ) {
      return;
    }

    // Create a local copy of the message for optimistic UI update
    const localMessage = {
      ...message,
      message:
        message.type !== "text"
          ? URL.createObjectURL(message.message)
          : message.message,
      id: Date.now(),
      created_at: Date.now(),
    };

    // Reset form and message state
    formRef.current.reset();
    setMessage({
      from_id: userId,
      chat_id: chatId,
      message: "",
      type: "",
    });
    setRecordingTime(0);

    // Notify parent component about the new message (for optimistic UI update)
    onMessageSent(localMessage);

    // Send message to server
    sendMessage(message);
  };

  const startRecording = async () => {
    setIsRecording(true);
    setRecordingTime(0);
    const audioChunks = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorderInstance = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });

      mediaRecorderInstance.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      mediaRecorderInstance.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/m4a" });

        setMessage((prevMessage) => ({
          ...prevMessage,
          message: audioBlob,
          type: "audio",
        }));

        mediaRecorderInstance.stream.getTracks().forEach((track) => {
          track.stop();
        });

        setIsRecording(false);
        clearInterval(recordingIntervalRef.current);
      };

      mediaRecorderInstance.start();
      setMediaRecorder(mediaRecorderInstance);
      startRecordingTimer();
    } catch (err) {
      console.error("Error accessing microphone:", err);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
    }
    clearInterval(recordingIntervalRef.current);
  };

  const startRecordingTimer = () => {
    recordingIntervalRef.current = setInterval(() => {
      setRecordingTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const formatRecordingTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div className="chat-send">
      <form onSubmit={handleSendMessage} ref={formRef}>
        <div className="input-field">
          {message?.type === "text" || message?.type === "" ? (
            <input
              type="text"
              placeholder={t("chat.writeHere")}
              value={message?.type === "text" ? message?.message : ""}
              onChange={(e) =>
                setMessage({
                  ...message,
                  message: e.target.value,
                  type: "text",
                })
              }
              disabled={isPending}
            />
          ) : (
            <div className="file_place">
              <i
                className="fa-regular fa-trash"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setMessage({ ...message, message: "", type: "" });
                  setRecordingTime(0);
                }}
              ></i>
              {message.type === "audio" ? (
                <audio controls src={URL.createObjectURL(message?.message)} />
              ) : (
                <p className="m-0">
                  {message?.message?.name || message?.message}
                </p>
              )}
            </div>
          )}

          <label className="files-input">
            <i className="fa-regular fa-paperclip"></i>
            <input
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setFileName(file.name);
                  setMessage({
                    ...message,
                    message: file,
                    type: file.type.startsWith("image/")
                      ? "image"
                      : file.type.startsWith("audio/")
                      ? "audio"
                      : "file",
                  });
                }
              }}
              type="file"
              name="userImage"
              id="img-upload"
              disabled={isPending}
            />
          </label>
          {isRecording ? (
            <label className="files-input" onClick={stopRecording}>
              <i className="fa-regular fa-pause"></i>
              <input type="" />
            </label>
          ) : (
            <label className="files-input" onClick={startRecording}>
              <i className="fa-regular fa-microphone"></i>
              <input type="" />
            </label>
          )}
          {recordingTime > 0 && (
            <span>{formatRecordingTime(recordingTime)}</span>
          )}
        </div>

        <button type="submit" disabled={isPending}>
          <i className="fa-regular fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
