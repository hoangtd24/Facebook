import classNames from "classnames/bind";
import styles from "./Menu.module.scss";

const cx = classNames.bind(styles);
function MenuItem({item}) {
  return (
    <div className={cx("menu-item")}>
      <div>
        <img src={item.icon} alt="" />
      </div>
      <div className={cx("menu-item_info")}>
        <span className={cx("menu-item_name")}>{item.name}</span>
        <span className={cx("menu-item_description")}>
          {item.description}
        </span>
      </div>
    </div>
  );
}

export default MenuItem;
