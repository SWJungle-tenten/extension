import React, { useEffect, useState } from "react";
import LoginModal from "./LoginModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Intro() {
  const [open, setOpen] = useState(false);
  const [cookies] = useCookies("accessToken");
  const go = useNavigate();

  useEffect(() => {
    if (cookies.accessToken) {
      axios
        .get(`${process.env.REACT_APP_SERVER_ADDR}/api/auth`, {
          headers: {
            "x-auth-token": cookies.accessToken,
          },
        })
        .then((res) => {
          console.log(res);
          go("/main");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const modalToggle = () => {
    setOpen(!open);
  };
  return (
    <div>
      <div className="grid p-10 space-y-3 justify-items-center bg-orange-400">
        <h1 className="mb-4 text-3xl font-semibold text-white">
          TENTEN Search
        </h1>
        <button
          onClick={modalToggle}
          className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-2xl"
          href="/signin"
        >
          시작하기
        </button>
      </div>
      <LoginModal openToggle={modalToggle} open={open} />
    </div>
  );
}
