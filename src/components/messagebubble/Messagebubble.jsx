import css from "./messagebubble.module.css";
import check from "../../assets/images/check.svg";
const Messagebubble = ({ data, myid }) => {
  return (
    <div
      className={css.container}
      style={{ alignSelf: data.userid === myid ? "flex-end" : null }}
    >
      <div
        className={css.profile}
        style={{ display: data.userid === myid ? "none" : null }}
      >
        <h1>J</h1>
      </div>
      <div className={css.msgsection}>
        <h2>{data.userid === myid ? "Me" : data.name}</h2>

        <div className={css.txtdiv}>
          <p>{data.message}</p>

          <div className={css.timestamp}>
            <p>{data.time}</p>
            <img src={check} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messagebubble;
