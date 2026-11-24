import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

function UserLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default UserLayout;
