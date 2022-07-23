import {Outlet} from "react-router-dom";
import Sidebar from "../components/_dash/Sidebar";

const DashLayout = () => {
  return (
    <div className='bg-blue-100'>
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default DashLayout;
