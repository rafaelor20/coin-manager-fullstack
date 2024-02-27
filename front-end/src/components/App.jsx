import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Names from "./Names";
import NotFoundPage from "./NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/names" element={<Names />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
