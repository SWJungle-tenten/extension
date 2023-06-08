import { useState } from "react";

function App() {
  const [turnOn, setTurnOn] = useState(false);
  return (
    <div className="App" style={{ width: "300px" }}>
      <header className="App-header">
        <button
          onClick={() => {
            setTurnOn(!turnOn);
          }}
        >
          블로그 미리보기 활성화: {turnOn ? "ON" : "OFF"}
        </button>
        <button>
          <a href="http://localhost:5500">로그인 하러가기</a>
        </button>
      </header>
    </div>
  );
}

export default App;
