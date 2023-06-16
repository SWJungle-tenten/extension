import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import io from "socket.io-client";
import Posts from "./Posts";
import Detail from "./Detail";
import ScrapListItem from "./ScrapListItem";
import Keyword from "./Keyword";
import Title from "./Title";

export default function Scrap({ data }) {
  const [scrapData, setScrapData] = useState(data);
  const [currentPath, setCurrentPath] = useState(true);
  const [currentKeyword, setCurrentKeyword] = useState(null);
  const [currentTitle, setCurrentTitle] = useState(null);
  const [showKeywords, setShowKeywords] = useState(false);
  const [cookies] = useCookies(["accessToken"]);
  // // 소켓 클라이언트 생성
  // const socket = io("ws://localhost:8080");

  // // 소켓 이벤트 리스너
  // socket.on("", () => {
  //   console.log("소켓 연결됨");
  // });

  // socket.on("keyWordByDate", () => {
  //   console.log("소켓 연결됨");c
  // });
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_ADDR}/api/keyWordByDate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userToken: cookies.accessToken }),
        }
      );
      // 추가된 부분: 응답의 상태를 체크합니다.
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setScrapData(data);
    } catch (error) {
      console.log("Error getting data:", error);
    }
  };
  // useEffect(() => {}, [scrapData]);

  const deleteKeyword = async (keyWord, userToken, date) => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_ADDR}/api/deleteKeyWord`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keyWord, date, userToken }),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    fetchData();
    // console.log("response", response);
    // let newScrapData = await response.json();
    // setScrapData(newScrapData);
    // 삭제한 데이터 response로 업데이트
    return;
  };

  const deleteTitle = async (title, userToken, date, url) => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_ADDR}/api/deleteUserScrap`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, date, userToken, url }),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    fetchData();
    // let newScrapData = await response.json();
    // setScrapData(newScrapData);
    return;
  };


  const handleTitleClick = (title) => {
    setCurrentPath(`/storage/${currentKeyword}/${title}`);
    setCurrentTitle(title);
  };

  const handleToggleKeywordClick = (keyword) => {
    setCurrentKeyword(currentKeyword === keyword ? null : keyword);
    setCurrentTitle(null);
  };

  return (
    <div className="h-screen flex overflow-auto">
      <div className="px-4 w-2/5 border-2 border-black overflow-auto">
        <div className="py-3 text-right">
          <button
            className="px-4 py-2 bg-blue-500 text-white"
            onClick={() => setShowKeywords(!showKeywords)}
          >
            {showKeywords ? "날짜별로 보기" : "검색어별로 보기"}
          </button>
        </div>
        {showKeywords &&
          scrapData &&
          scrapData.map((item, index) => (
            <ScrapListItem
              key={index}
              item={item}
              handleToggleKeywordClick={handleToggleKeywordClick}
              deleteKeyword={deleteKeyword}
              cookies={cookies}
              currentKeyword={currentKeyword}
              handleTitleClick={handleTitleClick}
              deleteTitle={deleteTitle}
            />
          ))}
        {!showKeywords &&
          scrapData &&
          scrapData.map((item, index) => (
            <div key={index}>
              {index === 0 || item.date !== scrapData[index - 1].date ? (
                <div>
                  <div className="text-2xl font-bold">{item.date}</div>
                  <ul>
                    {item.keywords.map((keyword, keywordIndex) => (
                      <li key={`keyword-${keywordIndex}`}>
                        <Keyword
                          keyword={keyword}
                          handleToggleKeywordClick={handleToggleKeywordClick}
                          deleteKeyword={deleteKeyword}
                          cookies={cookies}
                          item={item}
                        />
                        {keyword.data.map((title, titleIndex) => (
                          <div key={`title-${keywordIndex}-${titleIndex}`}>
                            <Title
                              title={title}
                              handleTitleClick={handleTitleClick}
                              deleteTitle={deleteTitle}
                              cookies={cookies}
                              item={item}
                            />
                          </div>
                        ))}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          ))}
      </div>
      {currentPath && (
        <div className="flex-1 ">
          {currentTitle ? (
            <Detail title={currentTitle} scrapData={scrapData} />
          ) : (
            <Posts id={currentKeyword} scrapData={scrapData} />
          )}
        </div>
      )}
    </div>
  );
}
