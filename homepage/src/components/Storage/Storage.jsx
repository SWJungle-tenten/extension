import React, { useEffect, useState, useCallback } from "react";
import Sidebar from "./Sidebar";
import Scrap from "./Scrap";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Storage() {
  const [data, setData] = useState(null);
  const [cookies] = useCookies(["accessToken"]);
  const [isLoading, setIsLoading] = useState(false);
  const go = useNavigate();
  

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_ADDR}/api/keyWordByDate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userToken: cookies.accessToken }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // 데이터가 없을 때, 메세지 보내주면, 그걸로 처리해야함.
      // const data_text = response.text();
      // console.log('data_text', data_text);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.log("Error getting data:", error);
    }
    setIsLoading(false);
  }, [cookies.accessToken]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!cookies.accessToken) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "로그인이 필요합니다.",
      });
      go("/");
    }
  },[fetchData]);


  return (
    <div className="flex">
      <div className="flex border border-black p-3 flex-shrink-0">
        {!isLoading&&<Sidebar data={data} />}
      </div>
      <div className="flex-grow">
        {!isLoading&&data&&<Scrap data={data} />}
      </div>
    </div>
  );
}
