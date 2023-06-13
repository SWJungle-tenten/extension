import React from "react";
import { Link } from "react-router-dom";

export default function Main() {
  return (
    <div>
      My name is Main 😡
      <div className="space-y-2">
        <p>
          <Link to="/">go to intro</Link>
        </p>
        <Link to="/storage">
          <p>go to storage</p>
        </Link>
      </div>
    </div>
  );
}
