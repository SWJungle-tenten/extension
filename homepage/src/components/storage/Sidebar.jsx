import React from "react";

const Sidebar = ({ userData }) => {
  console.log('user',userData);
  return (
    <div>
      <p className="text-lg font-bold">Sidebar</p>
      <p>{userData?.nickName}</p>
    </div>
  );
};

export default Sidebar;
