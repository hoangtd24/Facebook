import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToSearchHistory,
  clearSearchResult,
  deleteSearchHistory,
  search,
} from "../../features/user/userSlice";
import useDebounce from "../../hooks/useDebounce";
import { Return, Search } from "../../svg";
import styles from "./Header.module.scss";
const cx = classNames.bind(styles);
function SearchBox({
  color,
  searchValue,
  setSearchValue,
  setVisibleSearchBox,
}) {
  const { user } = useSelector((state) => state.auth);
  const { searchResult, searchHistory } = useSelector((state) => state.user);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const param = useDebounce(searchValue, 500);
  console.log(searchHistory);
  useEffect(() => {
    const handleSearch = async () => {
      inputRef.current.focus();
      if (!param.trim()) {
        dispatch(clearSearchResult());
        return;
      }
      dispatch(
        search({
          value: param,
          token: user.token,
        })
      );
    };
    handleSearch();
  }, [param]);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header-search-box")}>
        <div
          className={cx("arrow-left")}
          onClick={() => setVisibleSearchBox(false)}
        >
          <Return color={color} />
        </div>
        <div className={cx("search-box")}>
          <Search color={color} />
          <input
            type="text"
            placeholder="Tìm kiếm trên Facebook"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            ref={inputRef}
          />
        </div>
      </div>
      <div className={cx("search_content")}>
        {searchValue.trim().length > 0
          ? searchResult.map((item, index) => (
              <Link
                to={`/profile/${item._id}`}
                key={index}
                className={cx("search_item")}
                onClick={() => {
                  setVisibleSearchBox(false);
                  setSearchValue("");
                  dispatch(
                    addToSearchHistory({
                      searchUser: item._id,
                      token: user.token,
                    })
                  );
                }}
              >
                <img
                  src={item.picture}
                  alt=""
                  className={cx("search_item-img")}
                />
                <span className={cx("search_item-name")}>{item.username}</span>
              </Link>
            ))
          : searchHistory.map((item, index) => (
              <div className={cx("wrapper_search-item")}>
                <Link
                  to={`/profile/${item.user._id}`}
                  key={index}
                  className={cx("search_item")}
                  onClick={() => {
                    setVisibleSearchBox(false);
                    setSearchValue("");
                    dispatch(
                      addToSearchHistory({
                        searchUser: item.user._id,
                        token: user.token,
                      })
                    );
                  }}
                >
                  <img
                    src={item.user.picture}
                    alt=""
                    className={cx("search_item-img")}
                  />
                  <span className={cx("search_item-name")}>
                    {item.user.username}
                  </span>
                </Link>
                <span
                  className={cx("delete_btn")}
                  onClick={() =>
                    dispatch(
                      deleteSearchHistory({
                        idUser: item.user._id,
                        token: user.token,
                      })
                    )
                  }
                >
                  <i className={cx("exit_icon")}></i>
                </span>
              </div>
            ))}
      </div>
    </div>
  );
}

export default SearchBox;
