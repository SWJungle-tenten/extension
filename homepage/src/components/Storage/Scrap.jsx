import React, { useEffect, useState } from "react";

export default function Scrap({ scrapdata }) {
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
    <div className="h-screen flex px-5 ">
      <div className="px-4 w-1/3 border-2 border-black">
        <div className="text-right">
          <button className="px-2 py-2 rounded-sm bg-blue-500 text-white">
            검색어로 보기
          </button>
        </div>
        {scrapData &&
          scrapData.map((item, index) => (
            <div key={index}>
              {index === 0 || item.date !== scrapData[index - 1].date ? (
                <ul>
                  <li className="flex font-bold px-10" key={`date-${index}`}>
                    {item.date}
                  </li>
                  {item.keywords.map((keyword, keywordIndex) => (
                    <ul key={`keyword-${index}-${keywordIndex}`}>
                      <li>
                        <button
                          className="mt-2 block text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
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
        <div className="flex-1">
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
    <div className="py-8 border-2 border-black">
      <p className="text-center text-2xl font-bold">{title}</p>
      <div>
        <iframe title={title} src={titleData.url} className="h-96 w-full">
          <p>이 브라우저는 iframe을 지원하지 않습니다.</p>
        </iframe>
      </div>
    </div>
  );
}

function StoragePosts({ id, scrapData }) {
  const keywordData = getKeywordData(id, scrapData);

  return (
    <div className="py-8 border-2 border-black">
      <h1 className="text-2xl text-center font-bold">검색어: {id}</h1>
      {keywordData && (
        <ul className="h-full overflow-auto ">
          {keywordData.map((title, index) => (
            <div key={index}>
              <div className="text-left text-xl">{title.title}</div>
              <div>
                <iframe
                  title={`iframe-${index}`}
                  src={title.url}
                  className="w-full h-60"
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
