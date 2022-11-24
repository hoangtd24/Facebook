import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { Dots, NewRoom, Search } from "../../../svg";
import ActionItem from "../../ActionItem/ActionItem";
import styles from "./RightHome.module.scss";

const cx = classNames.bind(styles);
const color = "#65676b"
function RightHome() {
    const {user} = useSelector(state => state.auth)
  return (
    <div className={cx("wrapper")}>
      <div className={cx("home__right")}>
        <p className={cx("heading")}>Được tài trợ</p>
        <span className={cx("divider")}></span>
        <div className={cx("contact__header")}>
          <div className={cx("contact__header-left")}>
            Người liên hệ
          </div>
          <div className={cx("contact__header-right")}>
            <div className={cx("circle-icon")}>
                <NewRoom color={color}/>
            </div>
            <span className={cx("circle-icon")}>
                <Search color={color}/>
            </span>
            <span className={cx("circle-icon")}>
                <Dots color={color}/>
            </span>
          </div>
        </div>
        <ActionItem src={user.picture} name={user.username}/>
      </div>
    </div>
  );
}

export default RightHome;
