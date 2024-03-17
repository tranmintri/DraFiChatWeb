import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiArrowBack, BiSearchAlt2 } from "react-icons/bi";

export default function Profile({ toggleProfile }) {
  const user = {
    id: "1",
    email: "example@example.com",
    name: "John Doe",
    profilePicture: "/avatar/userprofile.jpg",
    about: "This is some information about me.",
  };
  return (
    <div className="h-full flex flex-col">
      <div className="h-24 flex items-end px-3 py-4">
        <div className="flex items-center gap-12 text-white">
          <BiArrowBack
            className="cursor-pointer text-xl"
            onClick={toggleProfile}
          />
          <span>My Profile</span>
        </div>
      </div>
      <div className=" bg-search-input-container-background h-full flex-auto overflow-auto custom-scrollbar">
        <div>
          <div class="w-full">
            <div class="mt-10 mx-auto w-32 h-32 relative border-4 border-white rounded-full overflow-hidden">
              <Image
                class="object-cover object-center h-32"
                src={"/avatar/userprofile.jpg"}
                width={300}
                height={300}
                alt=""
              />
            </div>
            <div class="text-center mt-2">
              <h2 class="font-semibold text-white text-2xl">{user?.name}</h2>
            </div>
            <div className="flex items-center justify-center mt-10">
              <table className="text-white table-fixed text-xl border-collapse w-8/12">
                <tr>
                  <td>Phone</td>
                  <td>Malcolm Lockyer</td>
                </tr>
                <tr>
                  <td>Gender</td>
                  <td>The Eagles</td>
                </tr>
                <tr>
                  <td>Birthday</td>
                  <td>The Eagles</td>
                </tr>
              </table>
            </div>
            <div className="flex justify-center w-ful items-center m-auto">
              <Link href="/">
                <button className="mt-7 flex justify-center items-center bg-lime-500 px-24 py-4 gap-7 rounded-lg mr-7 ">
                  <span className=" text-white text-2xl">
                    Edit your profile
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
