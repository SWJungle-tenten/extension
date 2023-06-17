import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Scrap from "./Scrap";
import { useCookies } from "react-cookie";
import io from "socket.io-client";

export default function Storage() {
  const [data, setData] = useState(null);
  const [cookies] = useCookies(["accessToken"]);
  const [isLoading, setIsLoading] = useState(false);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const socket = io("ws://localhost:8080");
    setSocket(socket);

    socket.on("connect", () => {
      console.log("socket.id", socket.id);
      socket.emit("check storage request from client", {
        userToken: cookies.accessToken,
      });
      socket.on("check storage respond from server", (data) => {
        setData(data.dataToSend);
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{ border: "1px solid black", padding: "10px", flexShrink: 0 }}
      >
        {!isLoading && <Sidebar data={data} />}
      </div>
      <div style={{ flexGrow: 1 }}>
        {!isLoading && data && <Scrap userScrapData={data} socket={socket} />}
      </div>
    </div>
  );
}
