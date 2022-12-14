import classNames from "classnames/bind";
import Dots from "../../svg/dots";
import Feeling from "../../svg/feeling";
import Photo from "../../svg/photo";
import styles from "./CreatePostPopup.module.scss";

const cx = classNames.bind(styles);

function AddPost({setPrev}) {
  return (
    <div className={cx("add_post")}>
      <span className={cx("add_post-title")}>Thêm vào bài viết của bạn</span>
      <div className={cx("add_post-right")}>
        <div className={cx("add_post-item")} onClick={() => setPrev(true)}>
          <Photo color="#45bd62" />
        </div>
        <div className={cx("add_post-item")}>
          <i className={cx("tag_icon")}></i>
        </div>
        <div className={cx("add_post-item")}>
          <Feeling color="#f7b928" />
        </div>
        <div className={cx("add_post-item")}>
          <i className={cx("maps_icon")}></i>
        </div>
        <div className={cx("add_post-item")}>
          <i className={cx("microphone_icon")}></i>
        </div>
        <div className={cx("add_post-item")}>
          <Dots color="#65676b" />
        </div>
      </div>
    </div>
  );
}

export default AddPost;
