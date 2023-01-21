import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { create, menuList } from "../../../data/allMenu";
import { Search } from "../../../svg";
import ActionItem from "../../ActionItem/ActionItem";
import styles from "./Menu.module.scss";
import MenuItem from "./MenuItem";

const color = "#65676b";
const cx = classNames.bind(styles);
function MenuList() {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className={cx("wrapper")}>
      <p className={cx("menu-heading")}>Menu</p>
      <div className={cx("menu-content")}>
        <div className={cx("menu-left")}>
          <div className={cx("search")}>
            <Search color={color} />
            <input type="text" placeholder="Tìm kiếm trên Facebook" />
          </div>
          {menuList.map((menu, index) => (
            <div className={cx("wrap")} key={index}>
              <p className={cx("menu-item_heading")}>{menu.heading}</p>
              {menu.list.map((item, index) => (
                <MenuItem item={item} key={index} />
              ))}
            </div>
          ))}
        </div>
        <div className={cx("menu-right")}>
          <div className={cx("menu-right_wrap")}>
            <p className={cx("menu-right_heading")}>Tạo</p>
            {create.map((item, index) => {
              if (item.divider) {
                return <div className={cx("divider")} key={index}></div>;
              } else {
                return (
                  <ActionItem name={item.name} icon={item.icon} key={index} invert={theme === "dark"}/>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuList;
