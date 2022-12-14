import classNames from "classnames/bind";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ResetPassword.module.scss";
import CodeVerification from "../verify/CodeVerification";
import axios from "axios";

const cx = classNames.bind(styles);
function ResetPassword({ user, setVisibleResetPassword }) {
  const [visibleVerify, setVisibleVerify] = useState(false);
  const handleSendCode = async () => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/sendResetPasswordCode`,
        {
          email: user.email,
        }
      );
      setVisibleVerify(true);
    } catch (error) {
      console.log(error);
    }
  };
  return !visibleVerify ? (
    <div className={cx("content")}>
      <p className={cx("heading")}>Đặt lại mật khẩu của bạn</p>
      <span className={cx("divider")}></span>
      <div className={cx("reset")}>
        <div className={cx("reset-left")}>
          <span className={cx("desc")}>
            Bạn muốn nhận mã để đặt lại mật khẩu bằng cách nào?
          </span>
          <label htmlFor="email">
            <input
              type="radio"
              id="email"
              checked
              className={cx("input")}
              onChange={() => {}}
            />
            <div className={cx("lable-wrap")}>
              <span>Gửi mã qua Email</span>
              <span>{user.email}</span>
            </div>
          </label>
        </div>
        <div className={cx("reset-right")}>
          <div
            className={cx("user-avatar")}
            style={{ backgroundImage: `url(${user.picture})` }}
          ></div>
          <p>Người dùng Facebook</p>
        </div>
      </div>
      <div className={cx("group-btn")}>
        <button
          className={cx("cancle-btn")}
          onClick={() => setVisibleResetPassword(false)}
        >
          Không phải là bạn ?
        </button>
        <button className={cx("search-btn")} onClick={handleSendCode}>
          Tiếp tục
        </button>
      </div>
    </div>
  ) : (
    <CodeVerification user={user} />
  );
}

export default ResetPassword;
