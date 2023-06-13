import React from "react";
import { useNavigate } from "react-router-dom";

export default function Storage() {
  const go = useNavigate();
  return (
    <div>
      Myname is Storage 🫠
      <div className="space-y-2">
        <p>
          <button onClick={() => go("/")}>go to intro</button>
        </p>
          <button onClick={() => go("/main")}>go to main</button>
      </div>
    </div>
  );
}
