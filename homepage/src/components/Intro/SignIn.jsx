import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

export default function SignIn(prop) {
  const { handleLogin } = prop;
  // const go = useNavigate();

  // const [info, setInfo] = useState([]);
  // const checkLogin = () => {
  //   // fetch('API', {
  //   //   method:"POST",
  //   //   body:
  //   // })
  //   fetch(`data/login.json`)
  //     .then((res) => res.json())
  //     .then((info) => {
  //       setInfo(info);
  //       console.log("hi");
  //     });
  // };
  // const a = () => {
  //   console.log(info[0].name);
  //   console.log(info.email);
  // };

  return (
    <div className="p-6 pb-0">
      <form className="space-y-2">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@gmail.com"
            required=""
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Password
          </label>
          <input
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="flex items-center justify-between"></div>
        <button
          // onClick={() => go("/main")}
          // onClick={checkLogin}
          type="submit"
          className="w-full text-white bg-orange-400 hover:bg-oragne-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-semibold rounded-lg text-sm px-5 py-2.5 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
        >
          로그인
        </button>
        {/* <button onClick={a}>dsds</button> */}
        <p className="text-sm font-light text-gray-600  dark:text-gray-400">
          계정이 없으신가요? {""}
          <button
            onClick={handleLogin}
            className="font-medium text-orange-600 hover:underline dark:text-orange-500"
          >
            회원가입
          </button>
        </p>
      </form>
    </div>
  );
}
