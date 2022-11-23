import HeadlessTippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import { useState } from "react";
import { useSelector } from "react-redux";
import { userMenu } from "../../../data/allMenu";
import ActionItem from "../../ActionItem/ActionItem";
import styles from "./UserMenu.module.scss";

const cx = classNames.bind(styles);
function UserMenu() {
  const { user } = useSelector((state) => state.auth);
  const [history, setHistory] = useState([{ data: userMenu }]);
  const [visibleUserMenu, setVisibleUserMenu] = useState(false);
  const current = history[history.length - 1];
  return (
    <HeadlessTippy
      visible={visibleUserMenu}
      interactive
      placement="bottom"
      onClickOutside={() => {
        setVisibleUserMenu(false);
        setHistory((prev) => prev.slice(0, 1))
      }}
      render={(attrs) => (
        <div className="box" tabIndex="-1" {...attrs}>
          <div className={cx("wrapper")}>
            <div className={cx("user-wrapper")}>
              {history.length > 1 ? (
                <div className={cx("menu-heading")}>
                  <span
                    className={cx("circle-icon")}
                    onClick={() =>
                      setHistory((prev) => prev.slice(0, prev.length - 1))
                    }
                  >
                    <i className={cx("arrow_back_icon")}></i>
                  </span>
                  <span className={cx("title")}>{current.title}</span>
                </div>
              ) : (
                <div className={cx("user__info")}>
                  <ActionItem src={user.picture} name={user.username} />
                </div>
              )}
              {current.data.map((item, index) => {
                if (item.children) {
                  return (
                    <ActionItem
                      icon={item.icon}
                      name={item.name}
                      rightIcon
                      auto
                      key={index}
                      onClick={() => {
                        if (item.children) {
                          setHistory((prev) => [...prev, item.children]);
                        }
                      }}
                    />
                  );
                } else {
                  return (
                    <ActionItem icon={item.icon} name={item.name} key={index} />
                  );
                }
              })}
            </div>
          </div>
        </div>
      )}
    >
      <div
        className={cx("avatar")}
        style={{ backgroundImage: `url(${user.picture})` }}
        onClick={() => setVisibleUserMenu(!visibleUserMenu)}
      ></div>
    </HeadlessTippy>
  );
}

export default UserMenu;