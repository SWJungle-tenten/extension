import React, { useEffect, useState } from "react";

export default function Scrap({ scrapdata }) {
  const [scrapData, setData] = useState(null);
  const [currentPath, setCurrentPath] = useState(null);
  const [currentKeyword, setCurrentKeyword] = useState(null);
  const [currentTitle, setCurrentTitle] = useState(null);
  const [showKeywords, setShowKeywords] = useState(false);

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
            <ul key={index}>
              {item.keywords.map((keyword, keywordIndex) => (
                <li key={`keyword-${index}-${keywordIndex}`}>
                  <button
                    className="mt-2 font-semibold block px-4 py-2 text-xl hover:bg-gray-100 hover:text-gray-900"
                    onClick={() => handleToggleKeywordClick(keyword.keyWord)}
                  >
                    검색어: {keyword.keyWord}
                  </button>
                  {currentKeyword === keyword.keyWord &&
                    keyword.data.map((title, titleIndex) => (
                      <div key={`title-${index}-${keywordIndex}-${titleIndex}`}>
                        <button
                          className="mt-1 font-medium block px-4 text-sm hover:bg-gray-100 hover:text-gray-900"
                          onClick={() => handleTitleClick(title.title)}
                        >
                          {title.title}
                        </button>
                      </div>
                    ))}
                </li>
              ))}
            </ul>
          ))}
        {!showKeywords &&
          scrapData &&
          scrapData.map((item, index) => (
            <div key={index}>
              {index === 0 || item.date !== scrapData[index - 1].date ? (
                <ul>
                  <li className="flex font-bold px-4" key={`date-${index}`}>
                    {item.date}
                  </li>
                  {item.keywords.map((keyword, keywordIndex) => (
                    <ul key={`keyword-${index}-${keywordIndex}`}>
                      <li>
                        <button
                          className="mt-2 font-semibold block px-4 py-2 text-xl hover:bg-gray-100 hover:text-gray-900"
                          onClick={() => handleKeywordClick(keyword.keyWord)}
                        >
                          검색어: {keyword.keyWord}
                        </button>
                      </li>
                      {keyword.data &&
                        keyword.data.map((title, titleIndex) => (
                          <ul
                            key={`title-${index}-${keywordIndex}-${titleIndex}`}
                          >
                            <li>
                              <button
                                className="mt-1 font-medium px-4 text-sm hover:bg-gray-100 hover:text-gray-900"
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
        <div className="flex-1 ">
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
    <div className="py-8 border-2 border-gray-400 h-screen">
      <p className="px-4 py-2 text-center text-2xl font-bold">{title}</p>
      <div>
        <iframe
          title={title}
          src={titleData.url}
          className="h-96 w-full px-4 py-2 border-spacing-4 border-4 border-gray-400"
        >
          <p>이 브라우저는 iframe을 지원하지 않습니다.</p>
        </iframe>
      </div>
    </div>
  );
}

function StoragePosts({ id, scrapData }) {
  const keywordData = getKeywordData(id, scrapData);

  return (
    <div className="py-4 border-2 border-gray-400 h-screen overflow-auto">
      <h1 className="px-4 py-2 text-2xl text-center font-bold">
        {id ? `검색어: ${id}` : ``}
      </h1>
      {keywordData && (
        <ul className="h-full overflow-auto p-6">
          {keywordData.map((title, index) => (
            <div key={index}>
              <div className="px-4 py-2 text-left text-xl">{title.title}</div>
              <div>
                <iframe
                  title={`iframe-${index}`}
                  src={title.url}
                  className="w-full h-60 px-4 py-2 border-2 border-gray-400"
                >
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
    const keywordData = item.keywords.find((data) => data.keyWord === keyword);
    if (keywordData) {
      return keywordData.data;
    }
  }
  return null;
}
