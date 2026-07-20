import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Orders from "../pages/Orders";
import History from "../pages/History";
import Settings from "../pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "history",
        element: <History />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);