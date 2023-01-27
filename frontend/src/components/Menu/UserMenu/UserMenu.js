import HeadlessTippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userMenu } from "../../../data/allMenu";
import ActionItem from "../../ActionItem/ActionItem";
import styles from "./UserMenu.module.scss";
import Cookies from "js-cookie";
import { logOut } from "../../../features/auth/authSlice";
import { setTheme } from "../../../features/theme/themeSlice";

const cx = classNames.bind(styles);
function UserMenu() {
  const { user } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.theme);
  const [history, setHistory] = useState([{ data: userMenu }]);
  const [visibleUserMenu, setVisibleUserMenu] = useState(false);
  const current = history[history.length - 1];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutUser = () => {
    dispatch(logOut());
    Cookies.set("user", "");
    navigate("/login");
  };
  return (
    <HeadlessTippy
      visible={visibleUserMenu}
      interactive
      placement="bottom"
      onClickOutside={() => {
        setVisibleUserMenu(false);
        setHistory((prev) => prev.slice(0, 1));
      }}
      render={(attrs) => (
        <div className="box" tabIndex="-1" {...attrs}>
          <div className={cx("wrapper")}>
            <div className={cx("user-wrapper")}>
              {history.length > 1 ? (
                <div className={cx("menu-heading")}>
                  <span
                    className={cx("circle-icon", { invert: theme === "dark" })}
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
                  <ActionItem
                    src={user.picture}
                    name={user.username}
                    to={`/profile/${user.id}`}
                    onClick={() => setVisibleUserMenu(false)}
                  />
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
                      invert={theme === "dark"}
                      onClick={() => {
                        if (item.children) {
                          setHistory((prev) => [...prev, item.children]);
                        }
                      }}
                    />
                  );
                } else {
                  if (item.theme) {
                    return (
                      <ActionItem
                        icon={item.icon}
                        name={item.name}
                        key={index}
                        invert={theme === "dark"}
                        onClick={() => dispatch(setTheme(item.theme))}
                      />
                    );
                  } else {
                    return (
                      <ActionItem
                        icon={item.icon}
                        name={item.name}
                        key={index}
                        invert={theme === "dark"}
                      />
                    );
                  }
                }
              })}
              {history.length === 1 && (
                <ActionItem
                  icon="logout_filled_icon"
                  name="Đăng xuất"
                  invert={theme === "dark"}
                  onClick={logOutUser}
                />
              )}
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
