import { useRoutes } from "react-router-dom";
import { routers } from "../../Router";

export default function AllRouter() {
  const element = useRoutes(routers);
  return <>{element}</>;
}
