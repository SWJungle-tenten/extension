import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StorageHome from "./StorageHome";
import StorageKeyword from "./StorageKeyword";

function Scrap({ scrapdata }) {
  const [scrapData, setData] = useState(null);
  const [currentPath, setCurrentPath] = useState(null);
  const [currentKeyword, setCurrentKeyword] = useState(null);
  const [currentTitle, setCurrentTitle] = useState(null);

  useEffect(() => {
    setData(scrapdata);
  }, [scrapdata]);

  const handleKeywordClick = (keyword) => {
    setCurrentPath(`/storage/${keyword}`);
    setCurrentKeyword(keyword);
    setCurrentTitle(null);
  };

  const handleTitleClick = (title) => {
    setCurrentPath(`/storage/${currentKeyword}/${title}`);
    setCurrentTitle(title);
  };

  return (
    <div>
      <div>
        <button>
          <Link to="/search">검색어로 보기</Link>
        </button>
        {scrapData &&
          scrapData.map((item, index) => (
            <div key={index}>
              {index === 0 || item.date !== scrapData[index - 1].date ? (
                <ul>
                  <li key={`date-${index}`}>{item.date}</li>
                  {item.keywords.map((keyword, keywordIndex) => (
                    <ul key={`keyword-${index}-${keywordIndex}`}>
                      <li>
                        <button
                          onClick={() => handleKeywordClick(keyword.keyWord)}
                        >
                          {keyword.keyWord}
                        </button>
                      </li>
                      {keyword.data &&
                        keyword.data.map((title, titleIndex) => (
                          <ul
                            key={`title-${index}-${keywordIndex}-${titleIndex}`}
                          >
                            <li>
                              <button
                                onClick={() => handleTitleClick(title.title)}
                              >
                                {title.title}
                              </button>
                            </li>
                          </ul>
                        ))}
                    </ul>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
      </div>
      {currentPath && (
        <div>
          {currentTitle ? (
            <Detail title={currentTitle} scrapData={scrapData} />
          ) : (
            <StoragePosts id={currentKeyword} scrapData={scrapData} />
          )}
        </div>
      )}
    </div>
  );
}

function Detail({ title, scrapData }) {
  const titleData = getTitleData(title, scrapData);

  return (
    <div>
      <p>{title}</p>
      <iframe title={title} src={titleData.url}>
        <p>이 브라우저는 iframe을 지원하지 않습니다.</p>
      </iframe>
    </div>
  );
}

function StoragePosts({ id, scrapData }) {
  const keywordData = getKeywordData(id, scrapData);

  return (
    <div>
      <h1>{id} 검색어</h1>
      {keywordData && (
        <ul>
          {keywordData.map((title, index) => (
            <div key={index}>
              <div>{title.title}</div>
              <div>
                <iframe title={`iframe-${index}`} src={title.url}>
                  <p>이 브라우저는 iframe을 지원하지 않습니다.</p>
                </iframe>
              </div>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Scrap;

function getTitleData(title, scrapData) {
  for (const item of scrapData) {
    for (const keyword of item.keywords) {
      const titleData = keyword.data.find((data) => data.title === title);
      if (titleData) {
        return titleData;
      }
    }
  }
  return null;
}

function getKeywordData(keyword, scrapData) {
  for (const item of scrapData) {
    const keywordData = item.keywords.find(
      (data) => data.keyWord === keyword
    );
    if (keywordData) {
      return keywordData.data;
    }
  }
  return null;
}