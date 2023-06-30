import axios from "axios";
import { SERVER_ADDR } from "/utils/env";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import alertSweetBeum from "../utils/alertSweetBeum";
import { useEffect } from "react";

function ScrapButton({ accessToken }) {
  const scrapHandler = (event) => {
    event.preventDefault();

    const iframe = document.querySelector("#previewer");
    const data = {
      keyWord: document.querySelector("#APjFqb").innerHTML,
      url: iframe.src,
      title: iframe.title,
    };

    axios({
      url: `${SERVER_ADDR}/api/saveScrap`,
      method: "post",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data,
    })
      .then((response) => {
        alertSweetBeum("성공", "링크");
        console.log(response);
      })
      .catch((error) => {
        alertSweetBeum("실패", "링크");
        console.error(error);
      });
  };

  useEffect(() => {
    const keypressHandler = (e) => {
      if (!document.activeElement?.tagName === "TEXTAREA" && e.code === "Space") {
        scrapHandler(e);
      }
    };
    document.addEventListener("onKeypress", keypressHandler);
    return () => {
      document.removeEventListener("onKeypress", keypressHandler);
    };
  }, []);

  return (
    <button
      className="btn"
      style={{
        "--btn-color": "var(--red-400)",
        "--btn-focus-color": "var(--red-300)",
      }}
      title="링크 스크랩"
      onClick={scrapHandler}
    >
      <BookmarkAddOutlinedIcon />
    </button>
  );
}

export default ScrapButton;
