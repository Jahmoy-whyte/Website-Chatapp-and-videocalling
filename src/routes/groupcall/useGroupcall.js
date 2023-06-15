import { useContext, useEffect, useRef, useState } from "react";
import { Peer } from "peerjs";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { Socketcontext } from "../../context/GBcontext";
const useGroupcall = () => {
  const [prevsocketid, setprevsocketid] = useContext(Socketcontext);
  const [data, setdata] = useState([]);
  const [showvideo, setshowvideo] = useState([]);

  const [streamdata, setstreamdata] = useState(null);

  const mysocketidref = useRef();
  const peerref = useRef();
  const videoref = useRef([]);
  const usersvideodata = useRef([]);
  const myvideo = useRef();
  const nav = useNavigate();

  useEffect(() => {
    if (!prevsocketid) {
      nav("/");
      return;
    }
    var getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    getUserMedia(
      { video: true, audio: true },
      (stream) => {
        // document.querySelector("video")
        setstreamdata(stream);
      },
      (err) => {
        nav("/");
        console.log("Failed to get local stream" + err);
      }
    );
  }, []);

  useEffect(() => {
    if (!streamdata) return;

    console.log("================================");
    console.log(streamdata);
    // "https://website-chat-app-videocall-server.onrender.com/"
    //"http://localhost:3000/"
    //  socketcontext === null ? io("http://localhost:3000/") : socketcontext;
    //console.log("prevsocketid " + prevsocketid);

    const stream = streamdata;
    const socket = io(
      "https://website-chat-app-videocall-server.onrender.com/"
    );
    const peer = new Peer();

    peerref.current = peer;
    myvideo.current.srcObject = stream;
    myvideo.current.muted = true;
    myvideo.current.autoplay = true;

    socket.on("connect", () => {
      mysocketidref.current = socket.id;
      console.log("THIS ID MY SOCKET ID : " + socket.id);
    });

    peer.on("open", (id) => {
      console.log("My peer ID is: " + id);
      socket.emit("joinedgroupcall", { peerid: id, active: true });
    });

    peer.on("call", (call) => {
      usersvideodata.current.push({
        peerid: call.peer, // other user peer id
        socketid: call.metadata.socketid, // other user socket id
        callinfo: call,
      });
      setshowvideo((prev) => [...prev, usersvideodata.current]);
      setdata((prev) => [...prev, usersvideodata.current]);
      call.answer(stream); // Answer the call with an A/V stream.
      call.on("stream", (remoteStream) => {
        videoref.current[videoref.current.length - 1].srcObject = remoteStream;
        videoref.current[videoref.current.length - 1].autoplay = true;

        // Show stream in some video/canvas element.
      });
    });

    socket.on("joinedgroupcall-res", (peerdata) => {
      console.log("joined user peerid " + peerdata.peerid);

      calluser(peerdata, stream);
    });

    socket.on("user-disconnected-groupcall", (socketid) => {
      dis(socketid);
    });

    return () => {
      if (streamdata !== null) {
        let stream = streamdata;
        let tracks = stream.getTracks();
        tracks.forEach(function (track) {
          track.stop();
        });
        //
        //
        //myvideo2.current.srcObject = null;
      }

      socket.disconnect();
      peer.destroy();
    };
  }, [streamdata]);

  //==============================================================================================
  //==============================================================================================

  const closecall = () => {
    let stream = myvideo.current.srcObject;
    let tracks = stream.getTracks();

    tracks.forEach(function (track) {
      track.stop();
    });

    myvideo.current.srcObject = null;
    nav(-1);
  };

  const calluser = (peerdata, stream) => {
    // user that join pass there socketid and peerid in {peerdata}
    //  setTimeout(() => {
    let options = {
      metadata: { socketid: mysocketidref.current, active: true },
    }; // we are sending our socket id to them in metadata
    var call = peerref.current.call(peerdata.peerid, stream, options);

    usersvideodata.current.push({ ...peerdata, callinfo: call });
    setshowvideo((prev) => [...prev, usersvideodata.current]);
    setdata((prev) => [...prev, usersvideodata.current]);

    call.on("stream", (remoteStream) => {
      // Show stream in some video/canvas element.
      // document.querySelector("video").srcObject
      videoref.current[videoref.current.length - 1].srcObject = remoteStream;
      videoref.current[videoref.current.length - 1].autoplay = true;
    });
    // }, 3000);
  };

  const dis = (socketid) => {
    console.log("USER DISCONNECTED");

    let res = -1;
    for (let i = 0; i < usersvideodata.current.length; i++) {
      if (usersvideodata.current[i].socketid === socketid) {
        res = i;
        break;
      }
    }

    //  console.log(newarr);
    // console.log("================================================");
    //console.log(data);
    //  console.log("================================================");
    //return;
    if (res > -1) {
      // let arr = [];
      usersvideodata.current[res].callinfo.close();
      usersvideodata.current[res].active = false;
      setshowvideo(usersvideodata.current);

      return;
      for (let i = 0; i < usersvideodata.current.length; i++) {
        if (usersvideodata.current[i].peerid === false) {
          arr.push(usersvideodata.current[i]);
        }
      }

      alert("found");
    }
    //  setdata(
    //    usersvideodata.current.filter((id) => {
    //      id !== socketid;
    //   })
    //  );
  };

  return [data, closecall, videoref, myvideo, showvideo];
};

export default useGroupcall;
