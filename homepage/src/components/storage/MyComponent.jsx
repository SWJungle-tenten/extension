import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useParams, useLocation } from "react-router-dom";
import StorageHome from "./StorageHome";
import StoragePosts from "./StoragePosts";

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
                      <li>
                        {keyword.keyWord}
                        {/* {console.log(keywordIndex)} */}
                      </li>
                      {keyword.data &&
                        keyword.data.map((title, titleIndex) => (
                          <ul
                            key={`title-${index}-${keywordIndex}-${titleIndex}`}
                          >
                            {/* {console.log(titleIndex)} */}
                            <Link
                              key={`link-${index}-${keywordIndex}-${titleIndex}`}
                              to={`/scrap/${keyword.keyWord}`}
                              state={{ url: title.url }}
                            >
                              {console.log("link:", keyword.keyWord)}
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
        <Route
          path="/scrap/:id"
          element={<SubComponent scrapData={scrapData} />}
        />
      </Routes>
    </div>
  );
}

function SubComponent() {
  const { keyword, id } = useParams();
  const url = useLocation().state;
  console.log("id:", id);
  console.log("key", keyword);
  return (
    <div>
      <h2>{id}</h2>
      <iframe src={url.url}></iframe>
    </div>
  );
}


export default MyComponent;
