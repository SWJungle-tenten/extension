import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import StorageHome from "./StorageHome";
import StoragePosts from "./StoragePosts";

function MyComponent() {
  const [scrapData, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts/"
      );
      const scrapData = await response.json();
      setData(scrapData);
    } catch (error) {
      console.log("Error getting scrapData:", error);
    }
  };

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

MyComponent.propTypes = {
  url: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  head: PropTypes.string.isRequired,
};

function SubComponent({ scrapData }) {
  const { id } = useParams();
  const post = scrapData?.find((item) => item.id.toString() === id);
  const body = post?.body;

  return (
    <div>
      <h2>Post ID: {id}</h2>
      {body && <p>Body: {body}</p>}
    </div>
  );
}

export default MyComponent;
