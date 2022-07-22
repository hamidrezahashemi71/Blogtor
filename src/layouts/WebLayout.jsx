import {Outlet} from "react-router-dom";
import Navbar from "../components/_web/Navbar";
import Footer from "../components/_web/Footer";

const WebLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default WebLayout;
