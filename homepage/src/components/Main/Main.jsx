import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import GroupModal from "../group/GroupModal";
import InviteModal from "../group/InviteModal";
import Swal from "sweetalert2";

export default function Main() {
  const [cookies, setCookie, removeCookie] = useCookies("accessToken");
  const go = useNavigate();

  // 그룹 생성 모달
  const [groupOpen, setGroupOpen] = useState(false);
  const groupModalToggle = () => {
    setGroupOpen(!groupOpen);
  };
  // 친구 초대 모달
  const [inviteOpen, setInviteOpen] = useState(false);
  const inviteModalToggle = () => {
    setInviteOpen(!inviteOpen);
  };
  // 그룹 제거
  const removeGroup = () => {
    Swal.fire({
      title: "그룹을 제거하시겠습니까?",
      text: "다시 되돌릴 수 없습니다.",
      icon: "warning",

      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "확인",
      cancelButtonText: "취소",

      reverseButtons: true, // 버튼 순서 거꾸로
    }).then((result) => {
      // 만약 Promise리턴을 받으면,
      if (result.isConfirmed) {
        // 만약 모달창에서 confirm 버튼을 눌렀다면

        Swal.fire({
          icon: "success",
          title: "제거 완료!",
          text: "그룹이 제거되었습니다.",
        });
      }
    });
  };

  // console.log(cookies.accessToken);
  useEffect(() => {
    if (!cookies.accessToken) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "로그인이 필요합니다.",
      });
      go("/");
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
        // removeCookie("accessToken");
        // go("/");
      });
  };
  return (
    <>
      <div className="flex p-10 space-x-2 justify-between bg-orange-400">
        <p className="text-3xl font-bold">My name is Main 😡</p>
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
          onClick={() => go("/storage")}
        >
          go to storage
        </button>
        <button
          onClick={groupModalToggle}
          className="text-white bg-orange-400 hover:bg-oragne-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-semibold rounded-lg text-sm px-5 py-2.5 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
        >
          그룹 생성
        </button>
        <GroupModal
          open={groupOpen}
          modaltoggle={groupModalToggle}
        ></GroupModal>
        <button
          onClick={inviteModalToggle}
          className="text-white bg-orange-400 hover:bg-oragne-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-semibold rounded-lg text-sm px-5 py-2.5 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
        >
          친구 초대
        </button>
        <InviteModal
          open={inviteOpen}
          modaltoggle={inviteModalToggle}
        ></InviteModal>
        <button
          onClick={removeGroup}
          className="text-white bg-orange-400 hover:bg-oragne-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-semibold rounded-lg text-sm px-5 py-2.5 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
        >
          {" "}
          그룹 제거{" "}
        </button>
      </div>
    </>
  );
}
