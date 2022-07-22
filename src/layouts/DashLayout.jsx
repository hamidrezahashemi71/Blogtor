import {Outlet} from "react-router-dom";
import Sidebar from "../components/_dash/Sidebar";

const DashLayout = () => {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};

export default DashLayout;
