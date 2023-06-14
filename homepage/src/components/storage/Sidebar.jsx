import { ClassNames } from "@emotion/react";
import React from "react";

const Sidebar = ({ userData }) => {
  return (
    <div>
      <p>Sidebar</p>
      {/* 받아온 userData를 이용해서 회원 아이디와 닉네임 출력 */}
      {/* <p>회원 아이디: {userData?.userId}</p> */}
      <p>닉네임: {userData?.nickName}</p>
    </div>
  );
};

export default Sidebar;
