import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Mockup from "../components/Mockup";

function DashboardLayout() {
  return (
    <div className="w-screen h-screen relative bg-[#FAFAFA]">
      <NavBar />
      <div className="h-[calc(100%-74px-16px)] md:h-[calc(100%-74px-24px)] w-full mt-4 md:mt-6  p-0 md:p-6 flex justify-center items-center gap-6">
        <Mockup />
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
