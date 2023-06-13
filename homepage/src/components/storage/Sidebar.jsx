import React, { useEffect, useState } from "react";

const Sidebar = () => {
  const [memberId, setMemberId] = useState("");
  const [groupId, setGroupId] = useState("");

  useEffect(() => {
    fetchMemberInfo();
  }, []);

  const fetchMemberInfo = async () => {
    try {
      const response = await fetch("API_URL");
      const userData = await response.json();

      setMemberId(userData.member_id);
      setGroupId(userData.group_id);
    } catch (error) {
      console.error("회원 정보를 가져오는 중 오류가 발생했습니다.", error);
    }
  };

  return (
    <div className="">
      <h2>사이드바</h2>
      <p>회원 ID: {memberId}</p>
      <p>그룹 ID: {groupId}</p>
    </div>
  );
};

export default Sidebar;
