import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Web from "./Web.jsx";
import ErrorPage from "./pages/404";

const routeDefault = {
  path: "/",
  element: <Web />,
  errorElement: <ErrorPage />,
};

const router = createBrowserRouter([routeDefault]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
