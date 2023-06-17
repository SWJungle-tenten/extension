import React from "react";
import Keyword from "./Keyword";
import Title from "./Title";

export default function ScrapListItem({
  item,
  handleToggleKeywordClick,
  deleteKeyword,
  cookies,
  currentKeyword,
  handleTitleClick,
  deleteTitle,
}) {
  return (
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
          {currentKeyword === keyword.keyWord &&
            keyword.data.map((title, titleIndex) => (
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
  );
}
