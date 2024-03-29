import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { Link, NavLink } from "react-router-dom";

import HeadlessTippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import {
  Gaming,
  Group,
  GroupActive,
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
import { useDispatch, useSelector } from "react-redux";
import SearchBox from "./SearchBox";
import { useState } from "react";
import MenuList from "../Menu/Menu/Menu";
import UserMenu from "../Menu/UserMenu/UserMenu";
import { getSearchHistory } from "../../features/user/userSlice";
const color = "#65676b";
const cx = classNames.bind(styles);

function Header() {
  const { user } = useSelector((state) => state.auth);
  const [visibleSearchBox, setVisibleSearchBox] = useState(false);
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [visibleMenuOnMobile, setVisibleMenuOnMobile] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  console.log(user);
  return (
    <header className={cx("header")}>
      <div className={cx("header-left")}>
        <HeadlessTippy
          visible={visibleSearchBox}
          interactive
          offset={[-20, -50]}
          placement="top-start"
          onClickOutside={() => setVisibleSearchBox(false)}
          render={(attrs) => (
            <div className="box" tabIndex="-1" {...attrs}>
              <SearchBox
                color={color}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                setVisibleSearchBox={setVisibleSearchBox}
              />
            </div>
          )}
        >
          <div className={cx("header_left-content")}>
            <Link to="/" className={cx("header_logo")}>
              <div className={cx("circle")}>
                <Logo />
              </div>
            </Link>
            <div
              className={cx("search")}
              onClick={() => {
                setVisibleSearchBox(true);
                dispatch(
                  getSearchHistory({
                    token: user.token,
                  })
                );
              }}
            >
              <Search color={color} />
              <input
                type="text"
                placeholder="Tìm kiếm trên Facebook"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </div>
        </HeadlessTippy>
        <div className={cx("header-right_mobile")}>
          <HeadlessTippy
            visible={visibleMenuOnMobile}
            interactive
            placement="bottom"
            onClickOutside={() => setVisibleMenuOnMobile(false)}
            render={(attrs) => (
              <div className="box" tabIndex="-1" {...attrs}>
                <MenuList />
              </div>
            )}
          >
            <div
              className={cx("circle-icon")}
              onClick={() => setVisibleMenuOnMobile(true)}
            >
              <Menu />
            </div>
          </HeadlessTippy>
          <div className={cx("circle-icon")}>
            <Messenger />
          </div>
          <div className={cx("circle-icon")}>
            <Notifications />
          </div>
          <UserMenu />
        </div>
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
          to="/groups"
          className={({ isActive }) => cx("middle-icon", { active: isActive })}
          end
        >
          <span className={cx("icon")}>
            <Group color={color} />
          </span>
          <span className={cx("active-icon")}>
            <GroupActive />
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
        <HeadlessTippy
          visible={visibleMenu}
          interactive
          placement="bottom"
          onClickOutside={() => setVisibleMenu(false)}
          render={(attrs) => (
            <div className="box" tabIndex="-1" {...attrs}>
              <MenuList />
            </div>
          )}
        >
          <div
            className={cx("circle-icon", { focus: visibleMenu })}
            onClick={() => setVisibleMenu(!visibleMenu)}
          >
            <Menu />
          </div>
        </HeadlessTippy>
        <div className={cx("circle-icon")}>
          <Messenger />
        </div>
        <div className={cx("circle-icon")}>
          <Notifications />
        </div>
        <UserMenu />
      </div>
    </header>
  );
}

export default Header;
