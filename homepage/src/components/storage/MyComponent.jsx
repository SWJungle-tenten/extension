import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useParams, useLocation } from "react-router-dom";
import StorageHome from "./StorageHome";

function MyComponent({ scrapdata }) {
  const [scrapData, setData] = useState(null);

  useEffect(() => {
    setData(scrapdata);
  }, [scrapdata]);

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          border: "1px solid black",
          padding: "10px",
          overflow: "scroll",
          height: "100vh",
        }}
      >
        <button style={{float: "right"}}> 검색어로 보기</button>
        {scrapData &&
          scrapData.map((item, index) => (
            <div key={index}>
              {index === 0 || item.date !== scrapData[index - 1].date ? (
                <ul>
                  <li key={`date-${index}`}>{item.date}</li>
                  {item.keywords.map((keyword, keywordIndex) => (
                    <ul key={`keyword-${index}-${keywordIndex}`}>
                      <Link
                        key={`link1-${index}-${keywordIndex}`}
                        to={`/storage/${keyword.keyWord}`}
                        state={{ titles: keyword.data }} // keyword.data를 state로 전달
                      >
                        <li>{keyword.keyWord}</li>
                      </Link>
                      {keyword.data &&
                        keyword.data.map((title, titleIndex) => (
                          <ul
                            key={`title-${index}-${keywordIndex}-${titleIndex}`}
                          >
                            <Link
                              key={`link2-${index}-${keywordIndex}-${titleIndex}`}
                              to={`/storage/${keyword.keyWord}/${title.title}`}
                              state={{ url: title.url }}
                            >
                              <li>{title.title}</li>
                            </Link>
                          </ul>
                        ))}
                    </ul>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
      </div>
      

      {/* 하위 컴포넌트를 라우트로 설정 */}
      <Routes>
        <Route path="/" element={<StorageHome />} />
        <Route path="/storage" element={<StorageHome />} />
        <Route path="/storage/:id" element={<StoragePosts />} />{" "}
        {/* /storage/:id에 대한 라우트 추가 */}
        <Route path="/storage/:id/:title" element={<SubComponent />} />
      </Routes>
    </div>
  );
}

function SubComponent() {
  const { title } = useParams();
  const url = useLocation().state;

  return (
    <div
      style={{
        border: "1px solid black",
        padding: "10px",
        overflow: "scroll",
        height: "100vh",
      }}
    >
      {/* 타이틀 글씨 크기 증가 및 굵게 처리 */}
      <p style={{ fontSize: '3em', fontWeight: 'bold' }}>{title}</p>
      <iframe
        title={`${title}`}
        src={url.url}
        style={{ width: "100vh", height: "40vh" }}
        loading="lazy"
      >
        <p>Your browser does not support this feature_iframe.</p>
      </iframe>
    </div>
  );
}


function StoragePosts() {
  const { id } = useParams();
  const location = useLocation();
  const titles = location.state?.titles;

  return (
    <div
      style={{
        border: "1px solid black",
        padding: "10px",
        overflow: "scroll",
        height: "100vh",
        loading: "lazy",
      }}
    >
      {/* 타이틀 글씨 크기 증가 및 굵게 처리 */}
      <h1 style={{ fontSize: '3em', fontWeight: 'bold' }}>검색어: {id}</h1>
      {titles && (
        <ul>
          {titles.map((title, index) => (
            <div key={index}>
              {/* 타이틀 글씨 크기 증가 및 굵게 처리 */}
              <div style={{ fontSize: '1.5em', fontWeight: 'bold' }}>{title.title}</div>
              <div>
                <iframe
                  title={`iframe-${index}`}
                  src={title.url}
                  style={{ width: "100vh", height: "40vh" }}
                >
                  <p>Your browser does not support this feature_iframe.</p>
                </iframe>
              </div>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}


export default MyComponent;
