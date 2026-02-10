import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import NotFoundPage from "./components/NotFoundPage.js";

export default function RouterApp() {
  return (
    <HashRouter basename="/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  );
}
