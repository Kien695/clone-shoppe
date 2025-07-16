import { Outlet } from "react-router-dom";
import MainHeader from "../../Components/MainHeader";
import Footer from "../../Components/Footer";

export default function MainLayout() {
  return (
    <div>
      <MainHeader />
      <Outlet />
      <Footer />
    </div>
  );
}
