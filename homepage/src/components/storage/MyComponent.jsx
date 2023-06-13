import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
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
        {scrapData && (
          <div>
            {scrapData.map((item, index) => (
              <ul key={index}>
                {index === 0 || item.userId !== scrapData[index - 1].userId ? (
                  <li>{item.userId}</li>
                ) : null}
                {item.title && (
                  <Link to={`/posts/${item.id}`} state={{ body: item.body }}>
                    {item.title}
                  </Link>
                )}
              </ul>
            ))}
          </div>
        )}
      </div>

      {/* 하위 컴포넌트를 라우트로 설정 */}
      <Routes>
        <Route path="/" element={<StorageHome />} />
        <Route path="/posts" element={<StoragePosts />} />
        <Route
          path="/posts/:id"
          element={<SubComponent scrapData={scrapData} />}
        />
      </Routes>
    </div>
  );
}

function SubComponent({ scrapData }) {
  const { id } = useParams();
  const posts = scrapData?.filter((item) => item.id.toString() === id);

  return (
    <div>
      <h2>Post ID: {id}</h2>
      {posts &&
        posts.map((post, index) => (
          <iframe key={index}>
            <p>Body: {post.body}</p>
          </iframe>
        ))}
    </div>
  );
}


export default MyComponent;
