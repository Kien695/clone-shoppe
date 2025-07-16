import { ToastContainer } from "react-toastify";
import AllRouter from "./Components/Allrouter";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <AllRouter />
      <ToastContainer />
    </>
  );
}
