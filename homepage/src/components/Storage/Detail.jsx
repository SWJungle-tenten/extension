export default function Detail({ title, userScrapData }) {
  const titleData = getTitleData(title, userScrapData);

  function getTitleData(title, userScrapData) {
    for (const item of userScrapData) {
      for (const keyword of item.keywords) {
        const titleData = keyword.data.find((data) => data.title === title);
        if (titleData) {
          return titleData;
        }
      }
    }
    return null;
  }
  return (
    <div className="py-8 border-2 border-gray-400 h-screen">
      <p className="px-4 py-2 text-center text-2xl font-bold">{title}</p>
      <div>
        <iframe
          title={title}
          src={titleData.url}
          className="h-96 w-full px-4 py-2 border-spacing-4 border-4 border-gray-400"
        >
          <p>이 브라우저는 iframe을 지원하지 않습니다.</p>
        </iframe>
      </div>
    </div>
  );
}
