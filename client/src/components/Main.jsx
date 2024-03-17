import React, { useEffect, useRef, useState } from "react";
import ChatList from "./Chatlist/ChatList";
import Empty from "./Empty";
import Chat from "./Chat/Chat";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { fireBaseAuth } from "../utils/FirebaseConfig";
import { CHECK_USER_ROUTE } from '@/utils/ApiRoutes';
import { useStateProvider } from './../context/StateContext';
import axios from "axios";
import { reducerCases } from "@/context/constants";
import { CHAT_API } from '@/utils/ApiRoutes';
import { io } from "socket.io-client";
import { HOST } from './../utils/ApiRoutes';

function Main() {
  const router = useRouter()
  const [{ userInfo, currentChatUser, currentChat, message }, dispatch] = useStateProvider()
  const [redirectLogin, setRedirectLogin] = useState(false)
  const socket = useRef()
  const [socketEvent, setSocketEvent] = useState(false)
  useEffect(() => {
    if (redirectLogin) {
      router.push("/login")
    }
  }, [redirectLogin])

  onAuthStateChanged(fireBaseAuth, async (currentUser) => {
    if (!currentUser)
      setRedirectLogin(true)
    if (!userInfo && currentUser?.email) {
      console.log(currentUser?.email)
      const { data } = await axios.post(CHECK_USER_ROUTE, { email: currentUser?.email })
      console.log(data)
      if (!data.status) {
        router.push("/login")
      }
      const { userId: userId, name, email, profilePicture: profileImage, status } = data.data
      dispatch({
        type: reducerCases.SET_USER_INFO, userInfo: {
          userId, name, email, profileImage, status
        }
      })
    }
  })
  useEffect(() => {
    if (userInfo) {
      socket.current = io(HOST)
      socket.current.emit("add-user", userInfo.userId)
      dispatch({ type: reducerCases.SET_SOCKET, socket: socket })
    }
  }, [userInfo])
  useEffect(() => {
    if (socket.current && !socketEvent) {
      socket.current.on("msg-recieve", (data) => {
        console.log(data)
        dispatch({
          type: reducerCases.ADD_MESSAGES,
          newMessage: {
            ...data.newMessage,
          }
        })
      })
      setSocketEvent(true)
    }
  }, [socket.current])
  useEffect(() => {
    const getMessage = async () => {
      const { data } = await axios.get(CHAT_API + currentChat?.chatId + "/messages")

      dispatch({
        type: reducerCases.SET_MESSAGES, messages: data
      })
    }
    if (currentChat?.chatId) {
      getMessage()
    }
  }, [currentChat])


  return (
    <div className="grid grid-cols-main h-screen w-screen max-h-screen max-w-full overflow-hidden">
      <ChatList />

      {
        currentChatUser || currentChat ? <Chat /> : <Empty />
      }
    </div>
  );
}

export default Main;
