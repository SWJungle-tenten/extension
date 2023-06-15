import React, {useState} from "react";

export default function Sidebar( userData ) {
  console.log('user',userData);
  return (
    <div>
      <p className="text-lg font-bold">Sidebar</p>
      <p>{userData?.nickName}</p>
    </div>
  );
};

