import axios from "axios";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function Storage() {
  const go = useNavigate();
  const [cookies, removeCookie] = useCookies("accessToken");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/auth", {
        headers: {
          "x-auth-token": cookies.accessToken,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        removeCookie("accessToken");
        alert("로그인이 필요합니다.")
        go("/");
      });
  }, []);
  const logout = () => {
    removeCookie("accessToken");
    go("/");
  };
  return (
    <>
      <div className="flex p-10 space-x-2 justify-between bg-orange-400">
        <p className="text-3xl font-bold">Myname is Storage 🫠</p>
        <button
          onClick={logout}
          className="bg-white text-orange-400 hover:bg-oragne-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-semibold rounded-lg text-sm px-5 py-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
        >
          로그아웃
        </button>
      </div>
      <div className="flex mt-2 pl-2 space-x-2 justify-center">
        <button
          className=" text-white bg-orange-400 hover:bg-oragne-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-semibold rounded-lg text-sm px-5 py-2.5 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
          onClick={() => go("/")}
        >
          go to intro
        </button>
        <button
          className="text-white bg-orange-400 hover:bg-oragne-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-semibold rounded-lg text-sm px-5 py-2.5 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
          onClick={() => go("/main")}
        >
          go to main
        </button>
      </div>
    </>
  );
}
