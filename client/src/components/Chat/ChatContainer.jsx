import { useStateProvider } from "@/context/StateContext";
import { calculateTime } from "@/utils/CalculateTime";
import React, { useEffect, useRef } from "react";

function ChatContainer() {
  const [{ messages, currentChatUser, currentChat, userInfo }] = useStateProvider()
  console.log(messages)
  const containerRef = useRef(null);

  // Hàm này được gọi mỗi khi messages thay đổi
  useEffect(() => {
    // Kiểm tra xem containerRef đã được khởi tạo chưa
    if (containerRef.current) {
      // Cập nhật giá trị scrollTop của container để cuộn xuống dưới cùng
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <div ref={containerRef} className="h-[80vh] w-full relative flex-grow overflow-auto custom-scrollbar">
      <div className=" bg-fixed h-full w-full opacity-30 fixed left-0 top-0 z-0"></div>
      <div className="mx-10 my-6 relative bottom-0 z-40 left-0">
        <div className="flex  w-full">
          <div className="flex flex-col justify-end w-full gap-1 overflow-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.senderId === currentChatUser.userId ? "justify-start" : "justify-end"}`}
                style={{ wordBreak: "break-word" }}
              >
                {message.type === "text" && (

                  <div className={`text-white px-2 py-[5px] mb-1 text-sm rounded-md flex gap-2 items-end max-w-[45%] ${message.senderId !== currentChatUser.userId ? "bg-incoming-background" : "bg-outgoing-background"}`}>
                    <span className="break-all">  {message.content}</span>
                    <div className="flex gap-1 items-end">

                      <span className="text-bubble-meta text-[11px] pt-1 min-w-fit ">
                        {calculateTime(message.timestamp)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;
{/* <div
          className="overflow-auto absolute bottom-4 right-4"
          style={{ maxHeight: "calc(80vh - 20px)" }}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className="text-white self-end p-4 mb-3 max-w-xs bg-blue-500 rounded-2xl"
              style={{ wordBreak: "break-word" }}
            >
              {message.content}
            </div>
          ))}
        </div> */}