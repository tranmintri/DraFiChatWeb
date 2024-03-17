import React, { useEffect } from "react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { CiFacebook } from "react-icons/ci";
import Link from "next/link";
import { fireBaseAuth } from './../utils/FirebaseConfig';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes"
import axios from "axios";
import { useRouter } from "next/router";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";


function login() {
  const router = useRouter()
  const [{ userInfo, newUser }, dispatch] = useStateProvider()


  useEffect(() => {
    if (userInfo?.id && !newUser)
      router.push("/")
  }, [userInfo, newUser])
  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    const { user: { displayName: name, email, photoURL: profileImage } } = await signInWithPopup(fireBaseAuth, provider)
    try {
      if (email) {
        const { data } = await axios.post(CHECK_USER_ROUTE, { email })
        console.log({ data })
        if (!data.status) {
          dispatch({
            type: reducerCases.SET_NEW_USER, newUser: true
          })
          dispatch({
            type: reducerCases.SET_USER_INFO, userInfo: {
              name,
              email,
              profileImage,
              status: ""
            }
          })
          router.push("/onboarding")
        }
        else {
          const { userId: userId, name, email, profilePicture: profileImage, status } = data.data
          dispatch({
            type: reducerCases.SET_USER_INFO, userInfo: {
              userId, name, email, profileImage, status
            }
          })
          router.push("/")
        }
      }
    } catch (error) {

    }
  };
  const handleLoginWithFacebook = async () => {
    alert("login with facebook");
  };

  return (
    <div className="flex justify-center items-center bg-panel-header-background h-screen w-screen flex-col gap-6  shadow-xl overflow-hidden">
      <div className="flex justify-center items-center gap-2 text-white">
        <Image src="/whatsapp.gif" height={200} width={200}></Image>
        <span className="text-7xl font-semibold">Eagle Chat</span>
      </div>
      <p className="text-ascent-1 text-3xl font-semibold text-white">
        Log in to your account
      </p>
      {/* <form className="w-1/3 h-fit items-center justify-center">
        <div class="mb-6">
          <label
            for="email"
            class="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="email@example.com"
            required
          />
        </div>
        <div class="mb-6 items-center">
          <label
            for="password"
            class="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
            required
          />
        </div>
        <Link href="/resetpassword">
          <p className="text-lg text-right text-blue-400 ">Forgot Password ?</p>
        </Link>
        <Link href="/onboarding">
          <button className="mt-7 w-full flex justify-center items-center bg-lime-500 p-3 gap-7 rounded-lg mr-7 ">
            <span className=" text-white text-2xl">Login</span>
          </button>
        </Link>
      </form> */}

      <div className="flex w-1/3 ">
        <button
          className="w-full flex bg-search-input-container-background p-3 gap-7 rounded-full mr-7"
          onClick={handleLoginWithGoogle}
        >
          <FcGoogle className="text-2xl " />
          <span className="text-white text-xl">Google</span>
        </button>
        {/* <button
          className="w-full flex  bg-blue-500 p-3 gap-7 rounded-full"
          onClick={handleLoginWithFacebook}
        >
          <CiFacebook className="text-2xl text-white" />
          <span className="text-white text-xl">Facebook</span>
        </button> */}
      </div>
      <p className="text-white text-lg text-center">
        Don't have an account?
        <Link
          href="/register"
          className="text-[#065ad8] font-semibold ml-2 cursor-pointer"
        >
          Create Account
        </Link>
      </p>
    </div>
  );
}

export default login;
