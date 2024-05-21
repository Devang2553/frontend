import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UserDetail from "./pages/UserDetail";
import { Routes, Route } from "react-router-dom";
import { PublicRouterOutlet } from "./layouts/Publicroutes";
import {
  PrivateRouteProps,
  PrivateRouterOutlet,
} from "./layouts/Privateroutes";
import PrivateAppLayout from "./layouts/PrivateLayout";
function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<PublicRouterOutlet {...defaultPublicRouteProps} />}
        >
          <Route path="/login" Component={Login}></Route>
          <Route path="/register" Component={Register}></Route>
        </Route>
        <Route
          path="/"
          element={
            <PrivateRouterOutlet
              {...defaultPrivateRouteProps}
              outlet={<PrivateAppLayout />}
            />
          }
        >
          <Route index Component={Dashboard}></Route>
          <Route path="/detail" Component={UserDetail}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;

export const defaultPrivateRouteProps: Omit<PrivateRouteProps, "outlet"> = {
  authenticationPath: "/login",
};

export const defaultPublicRouteProps: Omit<PrivateRouteProps, "outlet"> = {
  authenticationPath: "/  ",
};
