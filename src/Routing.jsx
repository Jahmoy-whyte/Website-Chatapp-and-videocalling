import App from "./routes/join page/Join_page.jsx";

import Chat_page from "./routes/chat page/Chat_page.jsx";
import Groupcall from "./routes/groupcall/Groupcall.jsx";
import {
  createHashRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { Socketcontext } from "./context/GBcontext.js";
import Test from "./Test.jsx";

const Routing = () => {
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

  const [socketcontext, setsocketcontext] = useState(null);
  return (
    <>
      <Socketcontext.Provider value={[socketcontext, setsocketcontext]}>
        <RouterProvider router={router} />
        <ToastContainer hideProgressBar />
      </Socketcontext.Provider>
    </>
  );
};

export default Routing;
