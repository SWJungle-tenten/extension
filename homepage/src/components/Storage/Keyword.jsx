import React from "react";

export default function Keyword({
  keyword,
  handleToggleKeywordClick,
  deleteKeyword,
  cookies,
  item,
}) {
  return (
    <div>
      <button
        className="mt-2 font-semibold px-4 py-2 text-xl hover:bg-gray-100 hover:text-gray-900"
        onClick={() => handleToggleKeywordClick(keyword.keyWord)}
      >
        검색어: {keyword.keyWord}
      </button>
      <button
        className="ml-2"
        onClick={() => {
          deleteKeyword(keyword.keyWord, cookies.accessToken, item.date);
        }}
      >
        x
      </button>
    </div>
  );
}
