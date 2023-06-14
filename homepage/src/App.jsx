import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import Intro from "./components/Intro/Intro";
import Main from "./components/Main/Main";
import Storage from "./components/Storage/Storage";


export default function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/main" element={<Main />} />
          <Route path="/storage/*" element={<Storage />} />
          <Route path="*" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  );
}
