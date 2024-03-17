import React, { useEffect, useState } from "react";
import Avatar from "../common/Avatar";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { GET_CHAT_BY_PARTICIPANTS } from "@/utils/ApiRoutes";
import axios from "axios";

function ChatLIstItem({
  data,
  isContactPage = false,

}) {
  const [{ userInfo, currentChatUser, currentChat }, dispatch] = useStateProvider()

  const handleContactClick = async () => {
    // if (currentChatUser?.userId === data?.userId) {

    dispatch({
      type: reducerCases.CHANGE_CURRENT_CHAT_USER, user: { ...data }
    })
    try {
      const response = await axios.post(GET_CHAT_BY_PARTICIPANTS, {
        participants: [userInfo?.userId, data?.userId]
      });
      console.log(response.data)
      const { chatId, name, email, deleteId, participants } = response.data
      dispatch({
        type: reducerCases.SET_CURRENT_CHAT, chat: {
          chatId, name, email, deleteId, participants
        }
      })
    } catch (error) {
      console.log(error)
    }
    dispatch({
      type: reducerCases.SET_ALL_CONTACTS_PAGE
    })

  };

  return (
    <div
      className={`flex cursor-pointer items-center hover:bg-background-default-hover`}
      onClick={handleContactClick}
    >
      <div className="min-w-fit px-5 pt-3 pb-1">
        <Avatar type="lg" image={data?.profilePicture} />
      </div>
      <div className="min-h-fit flex flex-col justify-center mt-3 pr-2 w-full">
        <div className="flex justify-between">
          <div>
            <span className=" text-white">{data?.name}</span>
          </div>
        </div>
        <div className="flex border-b border-conversation-border pb-2 pt-1 p-3 ">
          <div className="flex justify-between w-full">
            <span className="text-secondary line-clamp-1 text-sm">
              {data?.bio}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatLIstItem;
