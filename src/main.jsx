import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/join page/Join_page.jsx";
import "./index.css";
import Chat_page from "./routes/chat page/Chat_page.jsx";
import Groupcall from "./routes/groupcall/Groupcall.jsx";
import {
  createHashRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/chat",
    element: <Chat_page />,
  },

  {
    path: "/groupcall",
    element: <Groupcall />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <>
    <RouterProvider router={router} />
    <ToastContainer hideProgressBar />
  </>
  // </React.StrictMode>
);
