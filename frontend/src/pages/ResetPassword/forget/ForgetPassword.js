import Tippy from "@tippyjs/react";
import axios from "axios";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ResetPassword from "../reset/ResetPassword";
import styles from "./ForgetPassword.module.scss";

const cx = classNames.bind(styles);
function ForgetPassWord() {
  const [inputText, setInputText] = useState("");
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);
  const [visibleResetPassword, setVisibleResetPassword] = useState(false);
  const [user, setUser] = useState({});
  console.log(visibleResetPassword);

  const handleSearch = async () => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/findUser`,
        {
          email: inputText,
        }
      );
      setUser(result.data);
      setVisibleResetPassword(true);
    } catch (error) {
      setError(error.response.data.message);
      setVisible(true);
    }
  };
  return (
    <div>
      {!visibleResetPassword ? (
        <div className={cx("wrapper")}>
          <header className={cx("header")}>
            <Link to="/login">
              <img
                src="../../icons/facebook.svg"
                alt="logo"
                className={cx("logo")}
              />
            </Link>
            <button className={cx("login-btn")}>
              <Link to="/login">Đăng nhập</Link>
            </button>
          </header>
          <div className={cx("container")}>
            <div className={cx("content")}>
              <p className={cx("heading")}>Tìm tài khoản của bạn</p>
              <span className={cx("divider")}></span>
              {visible && (
                <div className={cx("error")}>
                  <p>Không có kết quả tìm kiếm</p>
                  <span>
                    Tìm kiếm không trả về kết quả nào. Vui lòng thử lại với
                    thông tin khác.
                  </span>
                </div>
              )}
              <span className={cx("desc")}>
                Vui lòng nhập email hoặc số di động để tìm kiếm tài khoản của
                bạn.
              </span>
              <input
                placeholder="Email hoặc số di động"
                className={cx("input")}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <div className={cx("group-btn")}>
                <button className={cx("cancle-btn")}>Hủy</button>
                <button className={cx("search-btn")} onClick={handleSearch}>
                  Tìm kiếm
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ResetPassword
          user={user}
          setVisibleResetPassword={setVisibleResetPassword}
          visibleResetPassword={visibleResetPassword}
        />
      )}
    </div>
  );
}

export default ForgetPassWord;
