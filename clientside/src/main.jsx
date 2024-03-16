import React from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import "./index.css";
import Homepage from "./components/Home/Homepage.jsx";
import Layout from "./Layout.jsx";
import { Auth0Provider } from "@auth0/auth0-react";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-s2qldime8th57mtv.jp.auth0.com"
      clientId="84iyPmZ6Ig4J9YpotTDkhCAEpCkhyoDL"
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <RouterProvider router={AppRouter} />
    </Auth0Provider>
  </React.StrictMode>
);
