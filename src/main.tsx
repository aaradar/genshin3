import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import Mondstadt from "./regions/mondstadt/Mondstadt.tsx";
import Liyue from "./regions/liyue/Liyue.tsx";
import Inazuma from "./regions/inazuma/Inazuma.tsx";
import Sumeru from "./regions/sumeru/Sumeru.tsx";
import Fontaine from "./regions/fontaine/Fontaine.tsx";
import Natlan from "./regions/natlan/Natlan.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/Mondstadt",
    element: <Mondstadt />,
  },
  {
    path: "/Liyue",
    element: <Liyue />,
  },
  {
    path: "/Inazuma",
    element: <Inazuma />,
  },
  {
    path: "/Sumeru",
    element: <Sumeru />,
  },
  {
    path: "/Fontaine",
    element: <Fontaine />,
  },
  {
    path: "/Natlan",
    element: <Natlan />,
  },
],{basename: "/genshin3"});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
