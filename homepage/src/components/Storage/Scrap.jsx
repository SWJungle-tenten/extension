import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useParams, useLocation } from "react-router-dom";
import StorageHome from "./StorageHome";
import StorageKeyword from "./StorageKeyword";

function Scrap({ scrapdata }) {
  const [scrapData, setData] = useState(null);

  useEffect(() => {
    setData(scrapdata);
  }, [scrapdata]);

  return (
    <div>
      <div>
        <button>
          <Link to="/search">검색어로 보기</Link>
        </button>
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
                        state={{ titles: keyword.data }}
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
      <Routes>
        <Route path="/storage/*" element={<StorageHome />} />
        <Route
          path="/search/*"
          element={<StorageKeyword scrapData={scrapData} />}
        />
        <Route path="/storage/:id" element={<StoragePosts />} />
        <Route path="/storage/:id/:title" element={<Detail />} />
      </Routes>
    </div>
  );
}

function Detail() {
  const { title } = useParams();
  const url = useLocation().state;

  return (
    <div>
      <p>{title}</p>
      <iframe
        title={`${title}`}
        src={url.url}
      >
        <p>이 브라우저는 iframe을 지원하지 않습니다.</p>
      </iframe>
    </div>
  );
}

function StoragePosts() {
  const { id } = useParams();
  const location = useLocation();
  const titles = location.state?.titles;
  console.log('id',id);
  console.log('titles',titles);
  return (
    <div>
      <h1>{id} 검색어</h1>
      {titles && (
        <ul>
          {titles.map((title, index) => (
            <div key={index}>
              <div>{title.title}</div>
              <div>
                <iframe
                  title={`iframe-${index}`}
                  src={title.url}
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

export default Scrap;
