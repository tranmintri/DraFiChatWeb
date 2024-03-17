import React from "react";
import { FcNext } from "react-icons/fc";
import Link from "next/link";

function ResetPassword() {
  return (
    <div className="flex  justify-center items-center bg-panel-header-background h-screen w-screen flex-col gap-6  shadow-xl overflow-hidden">
      <label
        for="helper-text"
        class="block mb-2 text-2xl font-medium text-gray-900 dark:text-white"
      >
        Your email was register
      </label>
      <input
        type="email"
        id="helper-text"
        aria-describedby="helper-text-explanation"
        class="bg-gray-50 border w-1/2 border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="email@example.com"
      />
      <p
        id="helper-text-explanation"
        class="mt-2 text-lg text-gray-500 dark:text-gray-400"
      >
        We will send otp to your email. Please check them out
      </p>
      <Link href="/verifyotp">
        <button className="bg-gray-300 hover:bg-gray-400 rounded-3xl  w-full text-gray-800 font-bold py-2 px-4 inline-flex items-center justify-center">
          <span className="px-7 ">
            <FcNext className=" text-4xl " />
          </span>
        </button>
      </Link>
    </div>
  );
}

export default ResetPassword;
