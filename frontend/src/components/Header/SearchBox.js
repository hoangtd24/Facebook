import classNames from "classnames/bind";
import { Return, Search } from "../../svg";
import styles from "./Header.module.scss";
const cx = classNames.bind(styles);
function SearchBox({ color }) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header-search-box")}>
        <div className={cx("arrow-left")}>
          <Return color={color} />
        </div>
        <div className={cx("search-box")}>
          <Search color={color} />
          <input type="text" placeholder="Tìm kiếm trên Facebook" />
        </div>
      </div>
    </div>
  );
}

export default SearchBox;
