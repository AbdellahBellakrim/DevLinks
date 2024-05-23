import { Route, Routes } from "react-router-dom";
import NotFound from "./routes/NotFoundPage";
import HomePage from "./routes/HomePage";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp";

function App() {
  return (
    <div className="w-screen h-screen overflow-x-hidden overflow-y-auto App bg-[#FAFAFA] text-black light">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
