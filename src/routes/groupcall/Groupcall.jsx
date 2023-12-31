import useGroupcall from "./useGroupcall";
import css from "./groupcall.module.css";
import close from "../../assets/images/closewhite.svg";
const Groupcall = () => {
  const [data, closecall, videoref, myvideo, showvideo] = useGroupcall();
  return (
    <div className={css.container}>
      <button className={css.endcall}>
        <img src={close} onClick={() => closecall()} />
      </button>

      <section className={css.allvideocontainer}>
        <div className={css.videodiv}>
          <video ref={myvideo} className={css.videotag} />
        </div>

        {data.map((data1, i) => {
          return (
            <div
              key={i}
              className={css.videodiv}
              style={{
                display: showvideo[i].active === false ? "none" : null,
              }}
            >
              <video
                className={css.videotag}
                ref={(el) => (videoref.current[i] = el)}
              />
            </div>
          );
        })}
      </section>
    </div>
  );
};
/* 

     <div className={css.videotag1}>wdwd</div>
        <div className={css.videotag1}>wdwd</div>
        <div className={css.videotag1}>wdwd</div>
        <div className={css.videotag1}>wdwd</div>
        <div className={css.videotag1}>wdwd</div>
*/

export default Groupcall;
