import Tippy from "@tippyjs/react";
import axios from "axios";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ResetPassword from "../reset/ResetPassword";
import styles from "./ChangePassword.module.scss";

const cx = classNames.bind(styles);
function ChangePassWord({ user }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChangePassword = async () => {
    try {
      if (password !== confirmPassword) {
        setError("Mật khẩu xác nhận chưa chính xác");
        return;
      } else {
        const result = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/changePassword`,
          {
            email: user.email,
            password: confirmPassword,
          }
        );
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCheck = (string) => {
    if (string.length >= 6) {
      return;
    }
    setError("Mật khẩu có độ dài tối thiểu 6 kí tự");
  };
  return (
    <div className={cx("content")}>
      <p className={cx("heading")}>Đặt lại mật khẩu</p>
      <span className={cx("divider")}></span>
      {error.length > 0 && (
        <div className={cx("error")}>
          <p>{error}</p>
          <span>Vui lòng thử lại</span>
        </div>
      )}
      <span className={cx("desc")}>
        Hãy chọn cho mình một mật khẩu có độ bảo mật cao
      </span>
      <input
        placeholder="Nhập mật khẩu mới"
        className={cx("input")}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        onBlur={() => handleCheck(password)}
        onFocus={() => setError("")}
      />
      <input
        placeholder="Nhập lại mật khẩu mới"
        className={cx("input")}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        type="password"
        onBlur={() => handleCheck(confirmPassword)}
        onFocus={() => setError("")}
      />
      <div className={cx("group-btn")}>
        <button className={cx("cancle-btn")}>Hủy</button>
        <button className={cx("search-btn")} onClick={handleChangePassword}>
          Tiếp tục
        </button>
      </div>
    </div>
  );
}

export default ChangePassWord;
