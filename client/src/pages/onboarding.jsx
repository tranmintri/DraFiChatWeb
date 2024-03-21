import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStateProvider } from '@/context/StateContext';
import axios from "axios";
import { useRouter } from "next/router";
import { ADD_USER } from "@/utils/ApiRoutes"
import { reducerCases } from "@/context/constants";

function Onboarding() {
  const router = useRouter()
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [{ userInfo, newUser }, dispatch] = useStateProvider();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    // Create a URL for the selected image
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  useEffect(() => {
    if (!newUser && !userInfo?.email) {
      router.push("/login")
    } else if (!newUser && !userInfo?.email) {
      router.push("/")
    }

  }, [newUser, userInfo, router])

  const goToMain = async () => {
    const email = userInfo.email
    const name = userInfo.name
    const profilePicture = userInfo.profileImage
    try {
      const { data } = await axios.post(ADD_USER, {
        email, name, profilePicture

      })
      console.log("try")
      if (data.status) {
        dispatch({
          type: reducerCases.SET_NEW_USER, newUser: false
        })
        dispatch({
          type: reducerCases.SET_USER_INFO, userInfo: {
            userId: data.userId,
            name,
            email,
            profileImage: profilePicture,
            status: ""
          }
        })
        router.push("/")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="bg-panel-header-background h-screen w-screen text-white flex flex-col items-center justify-center">
      <div className="flex items-cente justify-center gap-2">
        <Image src="/whatsapp.gif" alt="whatsapp" height={300} width={300} />
      </div>

      <div>
        <div>
          <label className="text-xl font-semibold"> YOUR NAME: </label>
          <input
            type="text"
            value={userInfo && userInfo?.name ? userInfo?.name : ""}
            className="rounded-lg w-full py-3 px-3 bg-input-background text-xl"
          />
        </div>

        <div className="flex items-center justify-center">
          <img
            src={userInfo && userInfo?.profileImage ? userInfo?.profileImage : ""}

            width={200}
            height={200}
            className="mt-3 rounded-full"
          />

        </div>

        <button className="bg-green-300 hover:bg-green-400 rounded-lg mt-10 w-full text-gray-800 font-bold py-2 px-4 inline-flex items-center justify-center"
          onClick={goToMain}
        >
          <span className="px-8 py-2">Done</span>
        </button>

      </div>
    </div>
  );
}

export default Onboarding;
