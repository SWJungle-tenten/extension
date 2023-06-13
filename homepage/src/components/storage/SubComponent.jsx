import React from "react";
import { useParams, useLocation } from "react-router-dom";

function SubComponent(data) {
  const { id } = useParams();
  const location = useLocation();
  const body = location.state?.body;
  return (
    <div>
      <h2>Post ID: {id}</h2>
      {body && <p>Body: {body}</p>}
      {/* Render the rest of the post info. */}
    </div>
  );
}

export default SubComponent;
