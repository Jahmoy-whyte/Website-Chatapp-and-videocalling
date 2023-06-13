import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const useChat_page = () => {
  const [data, setdata] = useState([]);
  const [txt, settxt] = useState("");
  const [messages, setmessages] = useState([]);
  const [menushow, setmenushow] = useState({ show: false, loading: true });

  const locat = useLocation();

  const socketref = useRef();
  const myid = useRef();
  const scrollref = useRef();
  // Generate a unique ID
  const nav = useNavigate();
  //console.log(name);

  let name;
  if (locat.state === null) {
    nav("/");
  } else {
    name = locat.state.name;
  }

  useEffect(() => {
    const socket = io(
      "https://website-chat-app-videocall-server.onrender.com/"
    );
    // "https://website-chat-app-videocall-server.onrender.com/"
    //"http://localhost:3000/"
    socketref.current = socket;
    const id = SetidandGetid();
    myid.current = id;

    socket.emit("main-chat", {
      name: name === "" ? "enter name" : name,
      peerjsID: "",
      userid: id,
    });

    socket.on("main-chat-res", (args) => {
      console.log(args.res);
      setmenushow((prev) => ({ ...prev, loading: true }));
      if (args.res === "error") {
        setdata([]);
        setmenushow((prev) => ({ ...prev, loading: false }));
        return;
      }

      setdata(args.res.filter((items) => items.Userid !== id));
      setmenushow((prev) => ({ ...prev, loading: false }));
    });

    socket.on("chat-messages-res", (msg) => {
      //console.log(msg);
      setmessages((prev) => [...prev, msg]);

      //  let el = document.getElementById("wd").sc;
      // let snum = 140;
      //   snum += scrollref.current.scrollHeight;
    });

    //  socket.on("disconnect", () => {
    //    console.log("socket.id"); // undefined
    //   });

    socket.on("connect", () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });

    //return () => socket.disconnect();
  }, []);

  useEffect(() => {
    scrollref.current.scrollTop = scrollref.current.scrollHeight;
  }, [messages]);

  const SetidandGetid = () => {
    const id = localStorage.getItem("userid");
    if (id === null) {
      const uniqueId = generateUniqueId();
      localStorage.setItem("userid", uniqueId);
      return uniqueId;
    }

    return id;
  };

  const sendmessage = () => {
    socketref.current.emit("chat-messages", {
      name: name === "" ? "enter name" : name,
      userid: myid.current,
      message: txt === "" ? "default test  message" : txt,
    });
  };

  const generateUniqueId = () => {
    const timestamp = Date.now().toString(36); // Convert current timestamp to base36 string
    const randomChars = Math.random().toString(36).substring(2, 8); // Generate a random base36 string
    return timestamp + randomChars;
  };

  return [
    data,
    txt,
    settxt,
    sendmessage,
    messages,
    myid.current,
    scrollref,
    menushow,
    setmenushow,
    nav,
  ];
};

export default useChat_page;
