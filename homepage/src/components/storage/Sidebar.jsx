import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import GroupModal from "../group/GroupModal";

export default function Sidebar() {
  const [cookies] = useCookies(["accessToken"]);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_ADDR}/api/giveUserName`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userToken: cookies.accessToken }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUserName(data.username);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserName();
  }, [cookies.accessToken]);

  // 그룹 생성, 친구초대 모달 오픈 구분
  const [change, setChange] = useState("");
  // 그룹 생성 모달
  const [groupOpen, setGroupOpen] = useState(false);
  const groupModalToggle = () => {
    setGroupOpen(!groupOpen);
    setChange("group");
  };
  // 친구 초대 모달
  const inviteModalToggle = () => {
    setGroupOpen(!groupOpen);
    setChange("invite");
  };
  // 그룹 제거
  const removeGroup = (id) => {
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
        handleDelete(id);
        Swal.fire({
          icon: "success",
          title: "제거 완료!",
          text: "그룹이 제거되었습니다.",
        });
      }
    });
  };
  // 그룹 보이기 & 마우스 올리면 제거 버튼
  const [hoveredId, setHoveredId] = useState(null);
  const [groups, setGroups] = useState([
    { id: 1, name: "Group 1" },
    { id: 2, name: "Group 2" },
    { id: 3, name: "Group 3" },
  ]);

  const handleDelete = (id) => {
    const updatedGroups = groups.filter((group) => group.id !== id);
    setGroups(updatedGroups);
  };

  // 누르면 그룹 내용 API 받기
  const handleGroupClick = (id) => {
    // 그룹 이름을 클릭할 때 수행할 동작을 구현합니다.
    console.log(`그룹 ${id}를 클릭했습니다.`);
  };


  return (
    <div>
      <p className="text-3xl font-bold">Sidebar</p>
      <p className="text-2xl">반가워요 {userName} 님 !!!</p>
      <div>
        {/* 여기에 그룹들 목록 */}
        {groups.map((group) => (
          <div
            key={group.id}
            className="text-black hover:bg-orange-100 focus:ring-4 focus:outline-none focus:ring-orange-300 font-semibold rounded-lg text-sm px-5 py-2.5 dark:bg-orange-600 dark:hover:bg-orange-500 dark:focus:ring-orange-800"
            onMouseEnter={() => setHoveredId(group.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* {group.name} */}
            <button onClick={() => handleGroupClick(group.id)}>{group.name}</button>
            {hoveredId === group.id && (
              <button
                className="pl-2"
                // onClick={() => handleDelete(group.id)}
                onClick={() => removeGroup(group.id)}
              >
                X
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <button
          onClick={groupModalToggle}
          className="text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300 font-semibold rounded-lg text-sm px-5 py-2.5 dark:bg-orange-600 dark:hover:bg-orange-500 dark:focus:ring-orange-800"
        >
          그룹 생성
        </button>
      </div>

      <div className="flex justify-center">
        <button
          onClick={inviteModalToggle}
          className="text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300 font-semibold rounded-lg text-sm px-5 py-2.5 dark:bg-orange-600 dark:hover:bg-orange-500 dark:focus:ring-orange-800"
        >
          친구 초대
        </button>
      </div>
      <div>
        <button
          onClick={removeGroup}
          className="text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300 font-semibold rounded-lg text-sm px-5 py-2.5 dark:bg-orange-600 dark:hover:bg-orange-500 dark:focus:ring-orange-800"
        >
          그룹 제거
        </button>
      </div>
      <GroupModal
        open={groupOpen}
        modaltoggle={groupModalToggle}
        change={change}
      ></GroupModal>
    </div>
  );
}
