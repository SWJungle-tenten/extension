import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import Intro from "./components/Intro/Intro";
import Main from "./components/Main/Main";
// import Storage from "./components/Storage/Storage";
// import StorageHome from "./components/Storage/StorageHome";
import StoragePosts from "./components/Storage/StorageHome";
import SubComponent from "./components/Storage/StorageHome";
import MyComponent from "./components/Storage/MyComponent";
// import StoragePosts from "./components/Storage/StoragePosts";


export default function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/main" element={<Main />} />
          {/* <Route path="/storage" element={<Storage />} />
           */}

          {/* <Route path="/storage" element={<StorageHome />} /> */}
          <Route path="/storage" element={<MyComponent />} />
          <Route path="/storage/:id" element={<StoragePosts />} />{" "}
          {/* /storage/:id에 대한 라우트 추가 */}
          <Route path="/storage/:id/:title" element={<SubComponent />} />
          <Route path="*" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  );
}
