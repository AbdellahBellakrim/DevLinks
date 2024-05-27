import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

function DashboardLayout() {
  return (
    <div className="w-screen h-screen relative bg-[#FAFAFA]">
      <NavBar />
      <div className="h-[calc(100%-74px-24px)] w-full mt-6 px-6 pb-6">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
