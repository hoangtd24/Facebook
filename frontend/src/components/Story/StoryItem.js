import classNames from "classnames/bind";
import styles from "./Story.module.scss";

const cx = classNames.bind(styles);

function StoryItem({ name, image, picture }) {
  return (
    <div className={cx("story")}>
      <div
        className={cx("story__img")}
        style={{ backgroundImage: `url(${picture})` }}
      ></div>
      <div className={cx("circle-avatar_wrap")}>
        <div
          className={cx("circle-avatar")}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      </div>
      <span className={cx("story_user")}>{name}</span>
    </div>
  );
}

export default StoryItem;
