import { useCallback, useEffect, useRef, useState } from "react";
import { Peer } from "peerjs";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
const useGroupcall = () => {
  const [data, setdata] = useState([]);
  const [showvideo, setshowvideo] = useState([]);
  const [myid, setmyid] = useState("");

  const mysocketidref = useRef();
  const peerref = useRef();
  const videoref = useRef([]);
  const usersvideodata = useRef([]);
  const myvideo = useRef();
  const nav = useNavigate();
  useEffect(() => {
    const socket = io(
      "https://website-chat-app-videocall-server.onrender.com/"
    );
    //"https://website-chat-app-videocall-server.onrender.com/"
    //"http://localhost:3000/"
    const peer = new Peer();
    const localvideoref = myvideo.current;
    peerref.current = peer;

    socket.on("connect", () => {
      mysocketidref.current = socket.id;
      console.log("THIS ID MY SOCKET ID : " + socket.id);
    });
    peer.on("open", (id) => {
      console.log("My peer ID is: " + id);
      setmyid(id);
      socket.emit("joinedgroupcall", { peerid: id, active: true });
    });
    var getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    getUserMedia(
      { video: true, audio: true },
      (stream) => {
        myvideo.current.srcObject = stream;
        myvideo.current.muted = true;
        myvideo.current.play();
        // document.querySelector("video")
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
            videoref.current[videoref.current.length - 1].srcObject =
              remoteStream;
            videoref.current[videoref.current.length - 1].play();
            // Show stream in some video/canvas element.
          });
        });

        socket.on("joinedgroupcall-res", (peerdata) => {
          console.log("joined user peerid " + peerdata.peerid);
          calluser(peerdata, stream);
        });
      },
      (err) => {
        console.log("Failed to get local stream" + err);
      }
    );

    socket.on("user-disconnected-groupcall", (socketid) => {
      dis(socketid);
    });

    return () => {
      //had to have a local variable to dismount
      let stream = localvideoref.srcObject;
      let tracks = stream.getTracks();
      tracks.forEach(function (track) {
        track.stop();
      });

      localvideoref.srcObjec = null;
      socket.disconnect();
    };
  }, []);

  const closecall = () => {
    nav("/");
  };

  const calluser = (peerdata, stream) => {
    // user that join pass there socketid and peerid in {peerdata}
    setTimeout(() => {
      let options = {
        metadata: { socketid: mysocketidref.current, active: true },
      }; // we are sending our socket id to them in metadata
      var call = peerref.current.call(peerdata.peerid, stream, options);

      usersvideodata.current.push({ ...peerdata, callinfo: call });
      setshowvideo((prev) => [...prev, usersvideodata.current]);
      setdata((prev) => [...prev, usersvideodata.current]);
      myvideo.current.srcObject = stream;
      myvideo.current.muted = true;
      myvideo.current.play();
      call.on("stream", (remoteStream) => {
        // Show stream in some video/canvas element.
        // document.querySelector("video").srcObject
        videoref.current[videoref.current.length - 1].srcObject = remoteStream;
        videoref.current[videoref.current.length - 1].play();
      });
    }, 3000);
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
    // console.log(res);
    //  console.log("================================================");
    //return;
    if (res > -1) {
      let arr = [];
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

  return [data, myid, closecall, videoref, myvideo, showvideo];
};

export default useGroupcall;
