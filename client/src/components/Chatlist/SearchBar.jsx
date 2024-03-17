import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { AiOutlineUserAdd, AiOutlineUsergroupAdd } from "react-icons/ai";

function SearchBar() {
  return (
    <div className=" bg-search-input-container-background flex py-3 pl-5 items-center gap-3 h-14">
      <div className="bg-panel-header-background flex items-center gap-5 px-3 py-1 rounded-lg flex-grow">
        <div>
          <BiSearchAlt2 className="text-panel-header-icon cursor-pointer text-xl" />
        </div>
        <div className="w-10/12">
          <input
            type="text"
            placeholder="Search or start a new chat"
            className="bg-transparent text-sm focus:outline-none text-white w-full"
          />
        </div>
      </div>
      <div className="flex pr-4 pl-3">
        <AiOutlineUserAdd className="bg-transparent cursor-pointer text-2xl focus:outline-none text-white w-full mr-5" />
        <AiOutlineUsergroupAdd className="bg-transparent cursor-pointer text-2xl focus:outline-none text-white w-full" />
      </div>
    </div>
  );
}

export default SearchBar;
