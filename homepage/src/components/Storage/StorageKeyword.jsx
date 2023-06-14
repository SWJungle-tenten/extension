import React, { useState, useEffect, useReducer } from "react";

function titleReducer(state, action) {
  if (state.includes(action.title)) {
    return state.filter((t) => t !== action.title);
  } else {
    return [...state, action.title];
  }
}

function StorageKeyword({ scrapData }) {
  const [keywords, setKeywords] = useState([]);
  const [selectedTitles, dispatch] = useReducer(titleReducer, []);

  useEffect(() => {
    if (scrapData) {
      const keywordList = scrapData
        .map((item) => item.keywords.map((keyword) => keyword.keyWord))
        .flat();
      setKeywords(keywordList);
    }
  }, [scrapData]);

  const handleKeywordClick = (keyword) => {
    const keywordTitles = scrapData.find(
      (item) => item.keywords.keyWord === keyword
    ).keywords.data.title;
    dispatch({ title: keywordTitles });
  };

  return (
    <div>
      {keywords.length > 0 ? (
        <ul>
          {keywords.map((keyword, index) => (
            <li
              key={`keyword-${index}`}
              onClick={() => handleKeywordClick(keyword)}
            >
              {keyword}
            </li>
          ))}
        </ul>
      ) : (
        <p>키워드가 없습니다.</p>
      )}
      {selectedTitles.length > 0 && (
        <ul>
          {selectedTitles.map((title, index) => (
            <li key={`title-${index}`}>{title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StorageKeyword;
