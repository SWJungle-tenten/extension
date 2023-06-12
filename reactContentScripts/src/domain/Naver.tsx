function Naver() {
  return (
    <div
      className="container"
      style={{
        border: "1px solid #e8ebee",
        borderRadius: "6px",
        boxShadow: "0px 1px 1px 0px rgba(0,0,0,.03)",
        marginLeft: "16px",
        marginRight: "30px",
        padding: "20px",
        height: "700px",
        backgroundColor: "#fff",
        overflow: "hidden",
      }}
    >
      <iframe title="embedding" src="https://zetawiki.com/wiki/GraphQL" style={{ height: "600px" }} />
    </div>
  );
}

export default Naver;
