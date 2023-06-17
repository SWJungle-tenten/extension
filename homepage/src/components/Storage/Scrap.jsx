import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Posts from "./Posts";
import Detail from "./Detail";
import ScrapListItem from "./ScrapListItem";
import Keyword from "./Keyword";
import Title from "./Title";

export default function Scrap({ socket, userScrapData }) {
  const [scrapData, setScrapData] = useState(userScrapData);
  const [currentPath, setCurrentPath] = useState(true);
  const [currentKeyword, setCurrentKeyword] = useState(null);
  const [currentTitle, setCurrentTitle] = useState(null);
  const [showKeywords, setShowKeywords] = useState(false);
  const [cookies] = useCookies(["accessToken"]);

  socket.on("deleteKeyWord respond from server", (data) => {
    setScrapData(data.dataToSend);
  });
  socket.on("deleteUserScrap respond from server", (data) => {
    setScrapData(data.dataToSend);
  });
  socket.on("saveUserScrap respond from server", (data) => {
    setScrapData(data.dataToSend);
  });

  const deleteKeyword = (keyWord, userToken, date) => {
    socket.emit("deleteKeyWord request from client", {
      keyWord,
      userToken,
      date,
    });
    socket.on("deleteKeyWord respond from server", (data) => {
      setScrapData(data.dataToSend);
    });
  };

  const deleteTitle = (title, userToken, date, url) => {
    socket.emit("deleteUserScrap request from client", {
      title,
      userToken,
      date,
      url,
    });

    socket.on("deleteUserScrap respond from server", (data) => {
      setScrapData(data.dataToSend);
    });
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
      {scrapData && currentPath && (
        <div className="flex-1 ">
          {currentTitle ? (
            <Detail title={currentTitle} userScrapData={scrapData} />
          ) : (
            <Posts id={currentKeyword} userScrapData={scrapData} />
          )}
        </div>
      )}
    </div>
  );
}
