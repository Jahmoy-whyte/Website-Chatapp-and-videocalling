import { useState } from "react";
import icon from "../../assets/images/icon.svg";
import css from "./join_page.module.css";
import { HashLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Join_page() {
  const [loading, setloading] = useState(false);
  const [name, setname] = useState("");
  const nav = useNavigate();
  return (
    <>
      <div className={css.container}>
        <div className={css.cir1}></div>
        <div className={css.cir2}></div>
        <div className={css.headingdiv}>
          <img src={icon} />
          <h1>Public Chat</h1>
        </div>

        <div className={css.contentcontainerdiv}>
          <div className={css.contentboxdiv}>
            <span>
              <h1>You Are Joining The Public Chat</h1>
              <p>Enter your Username to join</p>
            </span>

            <div>
              <h4>User Name:</h4>
              <input
                type="text"
                placeholder="Enter Name"
                onChange={(e) => setname(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (name === "") {
                      toast.warn("Please Enter Username");
                      return;
                    }
                    nav("/chat", {
                      state: {
                        name: name,
                      },
                    });
                  }
                }}
                value={name}
              />
            </div>

            <button
              disabled={loading}
              onClick={() => {
                if (name === "") {
                  toast.warn("Please Enter Username");

                  return;
                }
                nav("/chat", {
                  state: {
                    name: name,
                  },
                });
              }}
            >
              {loading === true ? (
                <HashLoader size={20} color="white" />
              ) : (
                "JOIN"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Join_page;
