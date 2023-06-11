import css from "./onlinecards.module.css";
import call from "../../assets/images/call.svg";
import video from "../../assets/images/video.svg";
const Onlinecards = ({ data }) => {
  return (
    <div className={css.container}>
      <div className={css.profileandinfo}>
        <div className={css.profile}>
          <h1>{data.Username.substring(0, 1).toUpperCase()}</h1>
        </div>

        <div className={css.info}>
          <h2>{data.Username}</h2>
          <p>Online</p>
        </div>
      </div>
    </div>
  );
};

/*
   <div className={css.callandvideo}>
        <img src={call} />
        <img src={video} />
      </div>

*/
export default Onlinecards;
