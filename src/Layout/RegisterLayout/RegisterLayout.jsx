import { Outlet } from "react-router-dom";
import RegisterHeader from "../../Components/RegisterHeader";
import Footer from "../../Components/Footer";

export default function RegisterLayout() {
  return (
    <>
      <RegisterHeader />
      <Outlet />
      <Footer />
    </>
  );
}
