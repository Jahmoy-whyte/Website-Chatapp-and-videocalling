import css from "./Chat_page.module.css";
import icon from "../../assets/images/chaticon.svg";
import search from "../../assets/images/search.svg";
import sendimg from "../../assets/images/send.svg";
import publiccall from "../../assets/images/publiccall.svg";
import menu from "../../assets/images/menu.svg";
import close from "../../assets/images/close.svg";
import useChat_page from "./useChat_page";
import Onlinecards from "../../components/onlinecards/Onlinecards";
import { useState } from "react";
import Messagebubble from "../../components/messagebubble/Messagebubble";

import ClipLoader from "react-spinners/ClipLoader";

const Chat_page = () => {
  const [
    data,
    txt,
    settxt,
    sendmessage,
    messages,
    myid,
    scrollref,
    menushow,
    setmenushow,
  ] = useChat_page();

  return (
    <>
      <div className={css.container}>
        <div className={css.siderbar}>
          <div>
            <img src={icon} />
          </div>
        </div>

        {menushow.show === true ? (
          <div
            className={css.background}
            onClick={() => setmenushow((prev) => ({ ...prev, show: false }))}
          >
            <div
              className={css.whoseonlinemobile}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={css.closediv}>
                <img
                  src={close}
                  onClick={() =>
                    setmenushow((prev) => ({ ...prev, show: false }))
                  }
                />
                <section>
                  <img src={search} />
                  <input type="text" placeholder="Search" />
                </section>
              </div>

              <div>
                {menushow.loading === false ? (
                  data.map((data) => {
                    return <Onlinecards data={data} key={data.Userid} />;
                  })
                ) : (
                  <div className={css.loadingcss}>
                    <ClipLoader color="#128199" size={20} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}

        <div className={css.whoseonline}>
          <section>
            <img src={search} />
            <input type="text" placeholder="Search" />
          </section>

          <div>
            {menushow.loading === false ? (
              data.map((data) => {
                return <Onlinecards data={data} key={data.Userid} />;
              })
            ) : (
              <div className={css.loadingcss}>
                <ClipLoader color="#128199" size={20} />
              </div>
            )}
          </div>
        </div>

        <div className={css.chat}>
          <div className={css.topbar}>
            <img
              className={css.menu}
              src={menu}
              onClick={() => setmenushow((prev) => ({ ...prev, show: true }))}
            />
            <div>
              <h1>Public Chat</h1>
              <p>{data.length} Online</p>
            </div>

            <img className={css.groupcall} src={publiccall} />
          </div>

          <section className={css.messagesection} ref={scrollref}>
            {messages.map((data, index) => {
              return <Messagebubble data={data} myid={myid} key={index} />;
            })}
          </section>

          <div className={css.textsection}>
            <div className={css.inputdiv}>
              <input
                type="text"
                placeholder="Type Message"
                onChange={(e) => settxt(e.target.value)}
                value={txt}
              />
            </div>
            <button className={css.btn} onClick={() => sendmessage()}>
              <img src={sendimg} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat_page;
