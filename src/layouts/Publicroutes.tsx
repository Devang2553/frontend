import { Navigate, Outlet } from "react-router-dom";
import { PrivateRouteProps } from "./Privateroutes";

export const PublicRouterOutlet = ({
  authenticationPath,
}: PrivateRouteProps) => {
  const token = localStorage.getItem("token");
  // console.log(token, "FDgfdg");

  return token ? <Navigate to={authenticationPath ?? "/"} /> : <Outlet />;
};
