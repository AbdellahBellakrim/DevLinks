import { Route, Routes } from "react-router-dom";
import NotFound from "./routes/NotFoundPage";
import HomePage from "./routes/HomePage";

function App() {
  return (
    <div className="w-screen h-screen overflow-x-hidden overflow-y-auto App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
