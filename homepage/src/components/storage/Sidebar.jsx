import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

export default function Sidebar() {
  const [cookies] = useCookies(["accessToken"]);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_ADDR}/api/giveUserName`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userToken: cookies.accessToken }),
        });

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

  return (
    <div>
      <p className="text-3xl font-bold">Sidebar</p>
      <p className="text-2xl">반가워요 {userName} 님 !!!</p>
    </div>
  );
};
