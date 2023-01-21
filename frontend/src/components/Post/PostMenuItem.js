import classNames from "classnames/bind";
import styles from "./Post.module.scss";

const cx = classNames.bind(styles);
function PostMenuItem({ icon, title, subtitle, image, onClick, invert }) {
  return (
    <div className={cx("menu_item")} onClick={onClick}>
      <div className={cx("menu_item-icon", { custom: subtitle }, {invert})}>
        {icon && <i className={cx(icon)}></i>}
        {image && <img src={image} alt="" className={cx("menu_item-img")} />}
      </div>
      <div className={cx("menu_item-description")}>
        <p className={cx("menu_item-title")}>{title}</p>
        {subtitle && <p className={cx("menu_item-subtitle")}>{subtitle}</p>}
      </div>
    </div>
  );
}

export default PostMenuItem;
