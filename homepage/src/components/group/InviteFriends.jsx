import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

export default function InviteFriends(prop) {
  const { inviteEmail, setInviteEmail } = prop;
  const [email, setEmail] = useState("");

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const inviteHandle = async () => {
    if (email) {
      // 중복 확인
      if (!inviteEmail.includes(email)) {
        // await axios
        //   .post(`${process.env.REACT_APP_SERVER_ADDR}/api/checkEmail`, {
        //     email: email,
        //   })
        //   .then((res) => {
        //     if (res.data.message === "없는 이메일") {
        //       return Swal.fire({
        //         icon: "error",
        //         title: "Oops...",
        //         text: "존재하지 않는 이메일입니다.",
        //       });
        //     }
            setInviteEmail((prev) => [...prev, email]);
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "이미 존재하는 이메일입니다.",
        });
      }
      setEmail("");
    }
  };
  const reversedEmails = [...inviteEmail].reverse();

  const inviteRemoveHandle = (email) => {
    setInviteEmail((prev) => prev.filter((n) => n !== email));
  };

  return (
    <div>
      <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
        친구 초대
      </label>
      <div className="flex items-center justify-between ">
        <input
          onChange={emailHandler}
          value={email}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-orange-600 focus:border-orange-600 block h-10 w-70 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
          placeholder="name@gmail.com"
        />
        <button
          type="button"
          onClick={inviteHandle}
          className=" text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300 font-semibold rounded-lg text-sm h-10 px-5 py-2.5 dark:bg-orange-600 dark:hover:bg-orange-500 dark:focus:ring-orange-800"
        >
          초대
        </button>
      </div>
      {reversedEmails.map((email, index) => (
        <div key={index} className="flex items-center mt-1">
          <div className="flex items-center border rounded-lg bg-blue-100 hover:bg-blue-300 px-2 py-1 ">
            <p>{email}</p>
            <button
              className="ml-4 text-gray-500 hover:text-red-500 focus:text-red-500"
              onClick={() => inviteRemoveHandle(email)}
            >
              X
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
