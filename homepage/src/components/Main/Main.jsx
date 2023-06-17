import axios from "axios";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Main() {
  const [cookies, setCookie, removeCookie] = useCookies("accessToken");
  const go = useNavigate();

  // console.log(cookies.accessToken);
  useEffect(() => {
    if (!cookies.accessToken) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "로그인이 필요합니다.",
      });
      // go("/");
    }
    // axios
    //   .get(`${process.env.REACT_APP_SERVER_ADDR}/api/auth`, {
    //     headers: {
    //       "x-auth-token": cookies.accessToken,
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     // console.log(error.response.data.msg);
    //     removeCookie("accessToken");
    //     alert("로그인이 필요합니다.");
    //     go("/");
    //   });
  }, []);
  const logout = async () => {
    if (cookies.accessToken) {
      await axios
        .get(`${process.env.REACT_APP_SERVER_ADDR}/api/logout`, {
          headers: {
            "x-auth-token": cookies.accessToken,
          },
        })
        .then((res) => {
          // console.log(res);
          removeCookie("accessToken");
          // alert("로그아웃 완료.");
          go("/");
        })
        .catch((error) => {
          // console.log(error);
          removeCookie("accessToken");
          go("/");
        });
    } else {
      go("/");
    }
  };
  return (
    <>
      <div className="flex p-10 space-x-2 justify-between bg-orange-400">
        <p className="text-3xl font-bold">My name is Main 😡</p>
        <button
          onClick={logout}
          className="bg-white text-orange-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300 font-semibold rounded-lg text-sm px-5 py-2 dark:bg-orange-600 dark:hover:bg-orange-500 dark:focus:ring-orange-800"
        >
          로그아웃
        </button>
      </div>
      <div className="flex mt-2 pl-2 space-x-2 justify-center">
        <button
          className=" text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300 font-semibold rounded-lg text-sm px-5 py-2.5 dark:bg-orange-600 dark:hover:bg-orange-500 dark:focus:ring-orange-800"
          onClick={() => go("/")}
        >
          go to intro
        </button>
        <button
          className="text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300 font-semibold rounded-lg text-sm px-5 py-2.5 dark:bg-orange-600 dark:hover:bg-orange-500 dark:focus:ring-orange-800"
          onClick={() => go("/storage")}
        >
          go to storage
        </button>
      </div>
    </>
  );
}
