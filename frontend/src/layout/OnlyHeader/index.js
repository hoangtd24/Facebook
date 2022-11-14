import classNames from "classnames";
import styles from "./OnlyHeader.module.scss";
import Header from "../../components/Header/Header.js";
const cx = classNames.bind(styles);

function OnlyHeader({ children }) {
  return (
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx("content")}>{children}</div>
    </div>
  );
}

export default OnlyHeader;
