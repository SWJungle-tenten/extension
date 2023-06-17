import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Scrap from "./Scrap";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";


export default function Storage() {
  const [data, setData] = useState(null);
  const [cookies] = useCookies(["accessToken"]);
  const [isLoading, setIsLoading] = useState(false);
  const go = useNavigate();
  
  
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

  useEffect(() => {
    if (!cookies.accessToken) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "로그인이 필요합니다.",
      });
      go("/");
    }
  },[data]);



  return (
    <div className="flex">
      <div
         className="flex border border-black p-3 flex-shrink-0">
        {!isLoading && <Sidebar data={data} />}
      </div>
      <div className="flex-grow">
        {!isLoading && data && <Scrap userScrapData={data} socket={socket} />}

      </div>
    </div>
  );
}
