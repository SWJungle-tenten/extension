import axios from "axios";
import { SERVER_ADDR } from "/utils/env";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import alertSweetBeum from "../utils/alertSweetBeum";

function ScrapButton({ accessToken }) {
  const scrapHandler = (event) => {
    // event.stopPropagation();
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
        console.log(response);
        // alert("스크랩 성공");
        alertSweetBeum("성공","링크");
      })
      .catch((error) => {
        // alert("스크랩 실패", error);
        alertSweetBeum("실패","링크");
      });
  };
  return (
    <button
      className="btn"
      style={{
        "--btn-color": "var(--red-400)",
        "--btn-focus-color": "var(--red-300)",
      }}
      title="링크 스크랩"
      onClick={(e) => {
        scrapHandler(e);
      }}
    >
      <BookmarkAddOutlinedIcon />
    </button>
  );
}

export default ScrapButton;
