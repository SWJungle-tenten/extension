import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Scrap from "./Scrap";
import { useCookies } from "react-cookie";
import { BrowserRouter } from "react-router-dom";

export default function Storage() {
  const [data, setData] = useState(null);
  const [cookies] = useCookies(["accessToken"]);
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_ADDR}/api/keyWordByDate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userToken: cookies.accessToken }),
      });
      console.log("response",response);
      // 추가된 부분: 응답의 상태를 체크합니다.
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("data",data);
      setData(data);
    } catch (error) {
      console.log("Error getting data:", error);
    }
  };
  
  return (
    <div style={{ display: "flex" }}>
      <div style={{ border: "1px solid black", padding: "10px" }}>
        <Sidebar data={data} />
      </div>
      <div>
        <Scrap scrapdata={data} />
      </div>
    </div>
  );
}
