import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { left } from "../../../data/home";
import ActionItem from "../../ActionItem/ActionItem";
import styles from "./LeftHome.module.scss";
const cx = classNames.bind(styles);
function LeftHome() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className={cx("wapper")}>
      <div className={cx("home__left")}>
        <div className={cx("user__info")}>
          <ActionItem src={user.picture} name={user.username} />
        </div>
        {left.map((item, index) => (
          <ActionItem
            key={index}
            name={item.text}
            src={item.img}
            className={cx("custom_img")}
          />
        ))}
      </div>
    </div>
  );
}

export default LeftHome;
