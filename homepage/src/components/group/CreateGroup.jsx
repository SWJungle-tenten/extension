import React, { useState } from "react";
import Swal from "sweetalert2";
import InviteFriends from "./InviteFriends";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function CreateGroup(prop) {
  const { modaltoggle } = prop;
  const [cookies] = useCookies("accessToken");
  const [groupName, setGroupName] = useState("");
  const [inviteEmail, setInviteEmail] = useState([]);
  const go = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
  };

  const groupNameHandler = (event) => {
    setGroupName(event.target.value);
  };

  const a = () => {
    console.log(inviteEmail);
  };
  const createGroup = async () => {
    // console.log(cookies.accessToken);
    if (cookies.accessToken) {
      await axios
        .post(`${process.env.REACT_APP_SERVER_ADDR}/api/makeGroup`, {
          members: inviteEmail,
          userToken: cookies.accessToken,
          groupName: groupName,
        })
        .then((res) => {
          console.log(res);
          Swal.fire({
            icon: "success",
            title: "그룹 생성 완료!",
          });
          modaltoggle();
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 400) {
            console.log(error.response.data.message);
            console.log("같은 이름의 그룹이 존재합니다!!");
          }
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "로그인이 필요합니다.",
      });
      go("/");
    }

    console.log(inviteEmail);
  };
  return (
    <div className="p-6  pb-0">
      <form className="space-y-1" onSubmit={submitHandler}>
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
            그룹 이름
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 mb-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
            placeholder="name"
            onChange={groupNameHandler}
          />
        </div>
        <InviteFriends
          inviteEmail={inviteEmail}
          setInviteEmail={setInviteEmail}
        />
        <div className="flex justify-end ">
          <button className="px-5" onClick={a}>
            dd
          </button>

          <button
            type="submit"
            onClick={createGroup}
            className="text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300 font-semibold rounded-lg text-sm mt-4 px-5 py-2.5 dark:bg-orange-600 dark:hover:bg-orange-500 dark:focus:ring-orange-800"
          >
            그룹 생성
          </button>
        </div>
      </form>
    </div>
  );
}
