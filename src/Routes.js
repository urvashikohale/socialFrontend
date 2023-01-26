import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

export default router;
