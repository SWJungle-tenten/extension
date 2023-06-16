import React, { useEffect, useState, useCallback } from "react";
import Sidebar from "./Sidebar";
import Scrap from "./Scrap";
import { useCookies } from "react-cookie";

export default function Storage() {
  const [data, setData] = useState(null);
  const [cookies] = useCookies(["accessToken"]);
  
  const fetchData = useCallback(async () => {
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
      console.log('response', response);
      // 데이터가 없을 때, 메세지 보내주면, 그걸로 처리해야함.
      // const data_text = response.text();
      // console.log('data_text', data_text);
      const data = await response.json();
      console.log('data', data);
      setData(data);
    } catch (error) {
      console.log("Error getting data:", error);
    }
  }, [cookies.accessToken]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  return (
    <div style={{ display: "flex" }}>
      <div style={{ border: "1px solid black", padding: "10px", flexShrink: 0 }}>
        <Sidebar data={data} />
      </div>
      <div style={{ flexGrow: 1 }}>
        <Scrap scrapdata={data} />
      </div>
    </div>
  );
}
