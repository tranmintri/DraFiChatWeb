import React, { useEffect, useState } from "react";
import ChatListHeader from "./ChatListHeader";
import SearchBar from "./SearchBar";
import List from "./List";
import ContactsList from "./ContactsList";
import Profile from "./../common/Profile";
import { useStateProvider } from "@/context/StateContext";

function ChatList() {

  const [{ contactsPage }] = useStateProvider()
  const [pageType, setPageType] = useState("default")

  useEffect(() => {
    if (contactsPage)
      setPageType("all-contacts")
    else
      setPageType("default")
  }, [contactsPage])

  return (
    <div className="bg-panel-header-background flex flex-col max-h-screen z-20 border-l">
      {pageType === "default" &&
        (
          <>
            <ChatListHeader />

            <SearchBar />
            <List />
          </>
        )}
      {pageType === "all-contacts" &&
        (
          <ContactsList />
        )}


      {/* <Profile /> */}



    </div>
  );
}

export default ChatList;
