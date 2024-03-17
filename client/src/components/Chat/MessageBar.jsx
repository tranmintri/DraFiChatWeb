import React, { useRef, useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";
import { FaMicrophone } from "react-icons/fa";
import { useStateProvider } from "@/context/StateContext";
import axios from "axios";
import { CHAT_API } from "@/utils/ApiRoutes";
import { reducerCases } from "@/context/constants";

function MessageBar() {
  const [{ userInfo, currentChatUser, currentChat, socket }, dispatch] = useStateProvider()
  const [message, setMessage] = useState("");
  const containerRef = useRef(null);
  const sendMessage = async () => {

    if (message.trim().length > 0) {
      try {
        const { data } = await axios.put(CHAT_API + currentChat?.chatId + "/messages", {
          newMessage: {
            senderId: userInfo?.userId,
            type: "text",
            content: message,
            timestamp: Date.now()
          }
        })
        socket.current.emit("send-msg", {
          receiveId: currentChatUser?.userId,
          newMessage: {
            senderId: userInfo?.userId,
            type: "text",
            content: data.data.newMessage.content,
            timestamp: Date.now()
          }
        })
        dispatch({
          type: reducerCases.ADD_MESSAGES,
          newMessage: {
            ...data.data.newMessage,
          },
          fromSelf: true
        })
        setMessage("")
      } catch (error) {
        console.log(error)
      }
    }
  };
  return (
    <div className="bg-panel-header-background h-24 px-4 flex items-center gap-6 relative">
      <>
        <div className="flex gap-6">
          <BsEmojiSmile
            className="text-panel-header-icon cursor-pointer text-xl"
            title="Emoji"
          />
          <ImAttachment
            className="text-panel-header-icon cursor-pointer text-xl"
            title="Attach File"
          />
        </div>
        <div className="w-full rounded-lg h-16 flex items-center">
          <textarea
            type="text"
            placeholder="Type a message"
            className="custom-scrollbar bg-input-background overflow-auto text-sm focus:outline-none text-white h-16 rounded-lg px-5 py-4 w-full"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
        </div>
        <div className="flex w-10 items-center justify-center">
          <button onClick={sendMessage}>
            <MdSend
              className="text-panel-header-icon cursor-pointer text-xl"
              title="send Message"

            />
            {/* <FaMicrophone
              className="text-panel-header-icon cursor-pointer text-xl"
              title="Record"
            /> */}
          </button>
        </div>
      </>
    </div>
  );
}

export default MessageBar;
