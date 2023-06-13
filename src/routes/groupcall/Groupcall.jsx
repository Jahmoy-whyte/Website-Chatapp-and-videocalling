import useGroupcall from "./useGroupcall";
import css from "./groupcall.module.css";
import close from "../../assets/images/closewhite.svg";
const Groupcall = () => {
  const [data, myid, closecall, videoref, myvideo, showvideo] = useGroupcall();
  return (
    <div className={css.container}>
      <button className={css.endcall} onClick={() => closecall()}>
        <img src={close} />
      </button>

      <section className={css.allvideocontainer}>
        <div className={css.videodiv}>
          <video ref={myvideo} className={css.videotag} />
        </div>

        {data.map((data, i) => {
          return (
            <div
              key={data?.socketid}
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
