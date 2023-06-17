import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

export default function SignUp(prop) {
  const { handleLogin } = prop;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
  };

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
        `${process.env.REACT_APP_SERVER_ADDR}/api/register`,
        { name: name, email: email, password: password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        // console.log(response);
        handleLogin();
        Swal.fire({
          icon: "success",
          title: "회원가입 완료!",
        });

      })
      .catch((error) => {
        if (error.response.status === 400) {
          return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "이미 존재하는 Email 입니다.",
          });
        }
        console.log("Error");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "회원가입 실패!",
          confirmButtonColor: "#0ea5e9",
        });
      });
  };
  return (
    <div className="p-6  pb-0">
      <form className="space-y-1" onSubmit={submitHandler}>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Name
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
            placeholder="name"
            onChange={nameHandler}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
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
            type={showPassword ? "text" : "password"}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
            onChange={passwordHandler}
          />
        </div>
        <div className="pt-1">
          <label className="">
            <input
              className=""
              type="checkbox"
              checked={showPassword}
              onChange={handleCheckboxChange}
            />
            <span className="pl-2">비밀번호 보기</span>
          </label>
        </div>
        <div className="flex items-center justify-between"></div>
        <button
          type="submit"
          className="w-full text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300 font-semibold rounded-lg text-sm px-5 py-2.5 dark:bg-orange-600 dark:hover:bg-orange-500 dark:focus:ring-orange-800"
        >
          회원가입
        </button>
        <p className="pt-2 text-sm font-light text-gray-600  dark:text-gray-400">
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
