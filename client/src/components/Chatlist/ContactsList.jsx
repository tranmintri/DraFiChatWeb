
import React, { useState, useEffect } from 'react';
import { BiArrowBack, BiSearchAlt2 } from "react-icons/bi";
import ChatLIstItem from "./ChatLIstItem";
import axios from 'axios';
import { GET_ALL_USER } from '@/utils/ApiRoutes';
import { useStateProvider } from '@/context/StateContext';
import { reducerCases } from "@/context/constants";

function ContactsList() {
  const [{ userInfo }, dispatch] = useStateProvider()
  const [allContacts, setAllContacts] = useState([])

  useEffect(() => {
    const getContact = async () => {

      try {

        const { data: { data } } = await axios.get(GET_ALL_USER)


        setAllContacts(data)
      } catch (error) {
        console.log(error)
      }
    }
    getContact();

  }, [])

  return (
    <div className="h-full flex flex-col">
      <div className="h-24 flex items-end px-3 py-4">
        <div className="flex items-center gap-12 text-white">
          <BiArrowBack
            className="cursor-pointer text-xl"
            onClick={() => dispatch({ type: reducerCases.SET_ALL_CONTACTS_PAGE })}
          />
          <span>New Chat</span>
        </div>
      </div>
      <div className=" bg-search-input-container-background h-full flex-auto overflow-auto custom-scrollbar">
        <div className="flex py-3 items-center gap-3 h-14">
          <div className="bg-panel-header-background flex items-center gap-5 px-3 py-1 rounded-lg flex-grow mx-4">
            <div>
              <BiSearchAlt2 className="text-panel-header-icon cursor-pointer text-xl" />
            </div>
            <div className="w-10/12">
              <input
                type="text"
                placeholder="Search Contact"
                className="bg-transparent text-sm focus:outline-none text-white w-full"
              />
            </div>
          </div>
        </div>

        {Object.entries(allContacts).map(([initialLerrer, userList]) => {
          return (
            <div key={Date.now() + initialLerrer}>
              <div className='text-teal-light pl-10 py-5'>{initialLerrer}</div>
              {userList.map(contact => {
                if (contact.userId !== userInfo?.userId) { // Kiểm tra xem userId của người dùng có khác "1" không
                  return (
                    <ChatLIstItem
                      data={contact}
                      isContactPage={true}
                      key={contact.userId}
                    />
                  );
                } else {
                  return null; // Nếu userId là "1", không render gì cả
                }
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ContactsList;
