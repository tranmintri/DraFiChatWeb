import React, { useState } from "react";
import Link from "next/link";

function verifyotp() {
  const [inputValues, setInputValues] = useState(["", "", "", "", "", ""]);

  const handleInputChange = (index, value) => {
    // Tạo một bản sao của mảng trạng thái hiện tại
    const newInputValues = [...inputValues];
    // Cập nhật giá trị tại vị trí index
    newInputValues[index] = value;
    // Cập nhật trạng thái với mảng mới
    setInputValues(newInputValues);
  };
  return (
    <div className="flex justify-center items-center bg-panel-header-background h-screen w-screen flex-col gap-6  shadow-xl overflow-hidden">
      <p className="text-white text-3xl mb-12 font-semibold">
        Please enter the OTP you received in the email
      </p>

      <div className="w-1/3 flex justify-center items-center">
        {inputValues.map((value, index) => (
          <input
            key={index}
            type="text"
            value={value}
            onChange={(e) => handleInputChange(index, e.target.value)}
            id="helper-text"
            maxlength="1"
            class="bg-gray-50 border mr-5 w-1/12 border-gray-300 text-gray-900 text-2xl rounded-lg text-center focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        ))}
      </div>
      <p> {inputValues.join("")}</p>
      <Link href="/login">
        <button className="bg-gray-300 hover:bg-gray-400 rounded-3xl mt-3 w-full text-gray-800 font-bold py-2 px-4 inline-flex items-center justify-center">
          <span className="px-8 py-2">Verify</span>
        </button>
      </Link>
    </div>
  );
}

export default verifyotp;
