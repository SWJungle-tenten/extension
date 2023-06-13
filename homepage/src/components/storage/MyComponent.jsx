import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useParams, useLocation } from "react-router-dom";
import StorageHome from "./StorageHome";
// import StoragePosts from "./StoragePosts";

function MyComponent({ data }) {
  const [scrapData, setData] = useState(null);

  useEffect(() => {
    setData(data);
  }, [data]);
  return (
    <div style={{ display: "flex" }}>
      <div>
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
                        to={`/scrap/${keyword.keyWord}`}
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
                              to={`/scrap/${keyword.keyWord}/${title.title}`}
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
        <Route path="/scrap" element={<StoragePosts />} />
        <Route path="/scrap/:id" element={<StoragePosts />} /> {/* /scrap/:id에 대한 라우트 추가 */}
        <Route path="/scrap/:id/:title" element={<SubComponent />} />
      </Routes>

    </div>
  );
}


function SubComponent() {
  const { title } = useParams();
  const url = useLocation().state;

  return (
    <div>
      <h2>스크랩 한 글 : {title}</h2>
      <iframe title={`${title}`} src={url.url}></iframe>
    </div>
  );
}

function StoragePosts() {
  const { id } = useParams();
  const location = useLocation();
  const titles = location.state?.titles;

  return (
    <div>
      <h1>검색어: {id}</h1>
      {titles && (
        <ul>
          {titles.map((title, index) => (
            <div key={index}>
              {title.title}
              <p>
              <iframe title={`iframe-${index}`} src={title.url} />
              </p>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyComponent;
