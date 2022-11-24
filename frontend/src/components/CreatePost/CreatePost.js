import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { Feeling, LiveVideo, Photo } from "../../svg";
import ActionItem from "../ActionItem/ActionItem";
import styles from "./CreatePost.module.scss";

const cx = classNames.bind(styles);
function CreatePost() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className={cx("create-post_wrap")}>
      <div className={cx("create-post_header")}>
        <div
          className={cx("user-avatar")}
          style={{ backgroundImage: `url(${user.picture})` }}
        ></div>
        <div className={cx("open-post")}>
          {user.lastname} ơi, Bạn đang nghĩ gì thế ?
        </div>
      </div>
      <span className={cx("divider")}></span>
      <div className={cx("actions")}>
        <ActionItem
          iconSvg={<LiveVideo color="#f3425f" />}
          name="Video trực tiếp"
          className={cx("custom-btn")}
        />
        <ActionItem
          iconSvg={<Photo color="#4bbf67" />}
          name="Ảnh/video"
          className={cx("custom-btn")}
        />
        <ActionItem
          iconSvg={<Feeling color="#f7b928" />}
          name="Feeling/activity"
          className={cx("custom-btn")}
        />
      </div>
    </div>
  );
}

export default CreatePost;
