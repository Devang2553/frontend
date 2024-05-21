import { Navigate } from "react-router-dom";
// import { GetUserProfile } from "../api/common/auth";
export const PrivateRouterOutlet = ({
  outlet,
  authenticationPath,
}: PrivateRouteProps) => {
  const token = localStorage.getItem("token");

  if (token) {
    return outlet;
  } else {
    <Navigate to={"/login"} />;
  }

  return (
    <Navigate
      to={{
        pathname: authenticationPath,
      }}
      replace
    />
  );
};

export type PrivateRouteProps = {
  authenticationPath?: string;
  prevPath?: string;
  outlet?: JSX.Element;
};
