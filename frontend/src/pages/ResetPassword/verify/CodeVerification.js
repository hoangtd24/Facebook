import axios from "axios";
import classNames from "classnames/bind";
import { useState } from "react";
import { Link } from "react-router-dom";
import ChangePassWord from "../change/ChangePassword";
import styles from "./CodeVerification.module.scss";

const cx = classNames.bind(styles);
function CodeVerification({ user }) {
  const [inputText, setInputText] = useState("");
  const [error, setError] = useState(false);
  const [visibleChangePassword, setVisibleChangePassword] = useState(false);

  const handleCheck = async () => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/validateCode`,
        {
          email: user.email,
          code: inputText,
        }
      );
      setError(false);
      setVisibleChangePassword(true);
    } catch (error) {
      setError(true);
    }
  };
  return !visibleChangePassword ? (
    <div className={cx("content")}>
      <p className={cx("heading")}>Nhập mã bảo mật</p>
      <span className={cx("divider")}></span>
      <span className={cx("desc")}>
        Vui lòng kiểm tra điện thoại để xem tin nhắn văn bản có mã. Mã của bạn
        có 6 ký tự.
      </span>
      {error && (
        <div className={cx("error")}>
          <p>Code bạn nhập chưa đúng</p>
          <span>Vui lòng thử lại !!!</span>
        </div>
      )}
      <input
        placeholder="Nhập mã"
        className={cx("input")}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <div className={cx("group-btn")}>
        <button className={cx("cancle-btn")}>Hủy</button>
        <button className={cx("search-btn")} onClick={handleCheck}>
          Tiếp tục
        </button>
      </div>
    </div>
  ) : (
    <ChangePassWord user={user} />
  );
}

export default CodeVerification;
