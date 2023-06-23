import axios from "axios";
import { SERVER_ADDR } from "../../../../utils/env";

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
      url: `${SERVER_ADDR}/saveUserScrap`,
      method: "post",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        alert("스크랩 실패", error);
      });
  };
  return (
    <button
      style={{ zIndex: "5" }}
      onClick={(e) => {
        scrapHandler(e);
      }}
    >
      스크랩하기
    </button>
  );
}

export default ScrapButton;
