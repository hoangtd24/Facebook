import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/zoom";

import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper";

import { Logo } from "../../svg";
import styles from "./PostDetail.module.scss";
import { useRef, useState } from "react";

const cx = classNames.bind(styles);
function PostLeft({ post }) {
  const inputRef = useRef();
  const [zoom, setZoom] = useState(1);
  const handleZoomIn = () => {
    inputRef.current.stepUp();
    setZoom(inputRef.current.value);
  };

  const handleZoomOut = () => {
    inputRef.current.stepDown();
    setZoom(inputRef.current.value);
  };
  return (
    <div className={cx("post-left")}>
      <div className={cx("post-left-header")}>
        <div className={cx("post-left-exit")}>
          <div className={cx("add_exit-icon")}>
            <i className={cx("exit_icon")}></i>
          </div>
          <Link to="/" className={cx("header_logo")}>
            <div className={cx("circle")}>
              <Logo />
            </div>
          </Link>
        </div>
        <div className={cx("post-left-action")}>
          <div className={cx("action-icon")} onClick={() => handleZoomIn()}>
            <ZoomInIcon sx={{ color: "#fff" }} />
          </div>
          <div className={cx("action-icon")} onClick={() => handleZoomOut()}>
            <ZoomOutIcon sx={{ color: "#fff" }} />
          </div>
          <div className={cx("action-icon")}>
            <i className={cx("fullscreen_icon")}></i>
          </div>
          <input
            type="range"
            min={1}
            max={1.25}
            step="0.05"
            hidden
            ref={inputRef}
            value={zoom}
          />
        </div>
      </div>
      <div className={cx("post-left-slider")}>
        {post.images && post.images.length > 1 ? (
          <Swiper
            zoom={true}
            slidesPerView={1}
            navigation={true}
            modules={[Navigation]}
            centeredSlides={true}
            className="mySwiper"
          >
            {post.images.map((img, index) => (
              <SwiperSlide key={index}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    transform: `scale(${zoom})`,
                  }}
                >
                  <img src={img.url} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          post.images && (
            <img
              src={post?.images[0]?.url}
              style={{ transform: `scale(${zoom})` }}
            />
          )
        )}
      </div>
    </div>
  );
}

export default PostLeft;
