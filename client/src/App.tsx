import { Route, Routes } from "react-router-dom";
import NotFound from "./routes/NotFoundPage";
import HomePage from "./routes/HomePage";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp";
import Layout from "./layouts/Layout";
import LinksPage from "./routes/LinksPage";
import ProfilePage from "./routes/ProfilePage";
import PreviewPage from "./routes/PreviewPage";

function App() {
  return (
    <div className="w-screen h-screen overflow-x-hidden overflow-y-auto App bg-[#FAFAFA] text-black light">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Layout />}>
          <Route path="links" element={<LinksPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="preview" element={<PreviewPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
