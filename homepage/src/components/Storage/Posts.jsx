export default function Posts({ id, userScrapData }) {
  const keywordData = getKeywordData(id, userScrapData);

  return (
    <div className="py-4 border-2 border-gray-400 h-screen overflow-auto">
      <h1 className="px-4 py-2 text-2xl text-center font-bold">
        {id ? `검색어: ${id}` : ``}
      </h1>
      {keywordData && (
        <ul className="h-full overflow-auto p-6">
          {keywordData.map((title, index) => (
            <div key={index}>
              <div className="px-4 py-2 text-left text-xl">{title.title}</div>
              <div>
                <iframe
                  title={`iframe-${index}`}
                  src={title.url}
                  className="w-full h-60 px-4 py-2 border-2 border-gray-400"
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

function getKeywordData(keyword, userScrapData) {
  for (const item of userScrapData) {
    const keywordData = item.keywords.find((data) => data.keyWord === keyword);
    if (keywordData) {
      return keywordData.data;
    }
  }
  return null;
}
