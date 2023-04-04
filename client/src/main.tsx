import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import App from "./App";
import About from "./components/About";
import "./styles/app.scss";

const router = createBrowserRouter([
  {
    path: "/:id",
    element: <App />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "*",
    loader: () => redirect(`/${(+new Date()).toString(16)}`),
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
