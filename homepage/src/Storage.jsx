import React, { useEffect, useState } from "react";
import Sidebar from "./components/storage/Sidebar";
import MyComponent from "./components/storage/MyComponent";
import { BrowserRouter } from "react-router-dom";

export default function Storage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData(); // App.js가 마운트될 때 데이터를 가져오도록 useEffect 훅 사용
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts/",
        {
          method: "GET",
          headers: {
            Authorization: "Token",
          },
        }
      ); // API를 통해 데이터를 가져옴
      const data = await response.json(); // 응답 데이터를 JSON 형식으로 변환
      setData(data); // 가져온 데이터를 상태로 설정
    } catch (error) {
      console.log("Error getting data:", error);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div>
        <Sidebar />
      </div>
      <div>
        <BrowserRouter>
          <MyComponent data={data} /> {/* 데이터를 MyComponent로 전달 */}
        </BrowserRouter>
      </div>
    </div>
  );
}
