import { BrowserRouter, Route, Routes } from "react-router-dom";
import Intro from "./components/Intro/Intro";
import Main from "./components/Main/Main";
import Storage from "./components/Storage/Storage";
import NotFound from "./components/Intro/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/main" element={<Main />} />
        <Route path="/storage" element={<Storage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
