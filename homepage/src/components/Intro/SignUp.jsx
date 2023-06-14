import axios from "axios";
import React, { useState } from "react";

export default function SignUp(prop) {
  const { handleLogin } = prop;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };
  const nameHandler = (event) => {
    setName(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    await axios
      .post(
        "http://localhost:8080/api/register",
        { name: name, email: email, password: password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        // console.log(response);
        handleLogin();
        alert("회원가입 완료");

      })
      .catch((error) => {
        if (error.response.status === 400) {
          return alert("이미 존재하는 Email 입니다.")
        }
        console.log("Error");
        alert("회원가입 실패!");
      });
  };
  return (
    <div className="p-6  pb-0">
      <form className="space-y-2" onSubmit={submitHandler}>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Name
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name"
            onChange={nameHandler}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@gmail.com"
            onChange={emailHandler}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Password
          </label>
          <input
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={passwordHandler}
          />
        </div>
        <div className="flex items-center justify-between"></div>
        <button
          type="submit"
          className="w-full text-white bg-orange-400 hover:bg-oragne-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-semibold rounded-lg text-sm px-5 py-2.5 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
        >
          회원가입
        </button>
        <p className="text-sm font-light text-gray-600  dark:text-gray-400">
          이미 계정이 있으신가요? {""}
          <button
            onClick={handleLogin}
            className="font-medium text-orange-600 hover:underline dark:text-orange-500"
          >
            로그인으로 이동
          </button>
        </p>
      </form>
    </div>
  );
}
