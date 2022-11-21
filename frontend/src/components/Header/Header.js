import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { Link, NavLink } from "react-router-dom";
import Tippy from "@tippyjs/react";

import HeadlessTippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import {
  Friends,
  FriendsActive,
  Gaming,
  Home,
  HomeActive,
  Logo,
  Market,
  MarketActive,
  Menu,
  Messenger,
  Notifications,
  Search,
  Watch,
  WatchActive,
} from "../../svg";
import { useSelector } from "react-redux";
import SearchBox from "./SearchBox";
import { useState } from "react";
const color = "#65676b";
const cx = classNames.bind(styles);

function Header() {
  const { user } = useSelector((state) => state.auth);
  const [visibleSearchBox, setVisibleSearchBox] = useState(false);
  console.log(user);
  return (
    <header className={cx("header")}>
      <div className={cx("header-left")}>
        <Link to="/" className={cx("header_logo")}>
          <div className={cx("circle")}>
            <Logo />
          </div>
        </Link>
        <HeadlessTippy
          visible={visibleSearchBox}
          interactive
          placement="right-end"
          offset={[-10, -314]}
          hideOnClick={true}
          trigger="click"
          onClickOutside={() => setVisibleSearchBox(false)}
          render={(attrs) => (
            <div className="box" tabIndex="-1" {...attrs}>
              <SearchBox color={color} />
            </div>
          )}
        >
          <div
            className={cx("search")}
            onClick={() => setVisibleSearchBox(true)}
          >
            <Search color={color} />
            <input type="text" placeholder="Tìm kiếm trên Facebook" />
          </div>
        </HeadlessTippy>
      </div>
      <div className={cx("header-middle")}>
        <NavLink
          to="/"
          className={({ isActive }) => cx("middle-icon", { active: isActive })}
        >
          <span className={cx("icon")}>
            <Home color={color} />
          </span>
          <span className={cx("active-icon")}>
            <HomeActive />
          </span>
        </NavLink>
        <NavLink
          to="/groups"
          className={({ isActive }) => cx("middle-icon", { active: isActive })}
          end
        >
          <span className={cx("icon")}>
            <Friends color={color} />
          </span>
          <span className={cx("active-icon")}>
            <FriendsActive />
          </span>
        </NavLink>
        <NavLink
          to="/watch"
          className={({ isActive }) => cx("middle-icon", { active: isActive })}
          end
        >
          <span className={cx("icon")}>
            <Watch color={color} />
          </span>
          <span className={cx("active-icon")}>
            <WatchActive />
          </span>
        </NavLink>
        <NavLink
          to="/market"
          className={({ isActive }) => cx("middle-icon", { active: isActive })}
          end
        >
          <span className={cx("icon")}>
            <Market color={color} />
          </span>
          <span className={cx("active-icon")}>
            <MarketActive />
          </span>
        </NavLink>
        <NavLink
          to="/gaming"
          end
          className={({ isActive }) => cx("middle-icon", { active: isActive })}
        >
          <Gaming color={color} />
        </NavLink>
      </div>
      <div className={cx("header-right")}>
        <div className={cx("circle-icon")}>
          <Menu />
        </div>
        <div className={cx("circle-icon")}>
          <Messenger />
        </div>
        <div className={cx("circle-icon")}>
          <Notifications />
        </div>
        <div
          className={cx("avatar")}
          style={{ backgroundImage: `url(${user.picture})` }}
        ></div>
      </div>
    </header>
  );
}

export default Header;
