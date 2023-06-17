import React from "react";

export default function Title({
  title,
  handleTitleClick,
  deleteTitle,
  cookies,
  item,
}) {
  return (
    <div>
      <button
        className="mt-1 font-medium px-4 text-sm hover:bg-gray-100 hover:text-gray-900"
        onClick={() => handleTitleClick(title.title)}
      >
        {title.title}
      </button>
      <button
        onClick={() => {
          deleteTitle(title.title, cookies.accessToken, item.date, title.url);
        }}
        className="ml-2"
      >
        x
      </button>
    </div>
  );
}
