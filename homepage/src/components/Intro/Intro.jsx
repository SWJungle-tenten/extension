import React, { useState } from "react";
import LoginModal from "./LoginModal";

export default function Intro() {
  const [open, setOpen] = useState(false);

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
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-2xl"
          href="/signin"
        >
          시작하기
        </button>
      </div>
      <LoginModal openToggle={modalToggle} open={open} />
    </div>
  );
}
