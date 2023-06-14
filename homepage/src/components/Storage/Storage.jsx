import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import MyComponent from "./MyComponent";
import { BrowserRouter } from "react-router-dom";

export default function Storage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData(); // App.js가 마운트될 때 데이터를 가져오도록 useEffect 훅 사용
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/keyWordByDate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // JSON 형식으로 요청을 보내기 위해 Content-Type 헤더를 설정합니다.
        },
        body: JSON.stringify({ userId: "cofla" }), // userId를 포함한 객체를 JSON 문자열로 변환하여 본문에 포함시킵니다.
      });
      const data = await response.json(); // 응답 데이터를 JSON 형식으로 변환합니다.
      setData(data); // 가져온 데이터를 상태로 설정합니다.
    } catch (error) {
      console.log("Error getting data:", error);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ border: "1px solid black", padding: "10px" }}>
        <Sidebar data={data}/>
      </div>
      <div>
        <BrowserRouter>
          <MyComponent scrapdata={data} /> {/* 데이터를 MyComponent에 전달합니다 */}
        </BrowserRouter>
      </div>
    </div>
  );
}
