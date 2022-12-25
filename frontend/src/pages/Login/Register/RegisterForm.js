import classNames from "classnames/bind";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputForm from "../../../components/InputForm/InputForm";
import styles from "./RegisterForm.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../features/auth/authSlice";

const cx = classNames.bind(styles);
const gender = [
  {
    value: "male",
    label: "Nam",
  },
  {
    value: "female",
    label: "Nữ",
  },
  {
    value: "other",
    label: "Khác",
  },
];
function RegisterForm({ setVisible }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, errorRegister } = useSelector((state) => state.auth);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bDay, setBDay] = useState(new Date().getDate());
  const [bMonth, setBMonth] = useState(new Date().getMonth() + 1);
  const [bYear, setBYear] = useState(new Date().getFullYear());
  const [genderInput, setGenderInput] = useState("male");

  const handleSubmit = async () => {
    try {
      const result = await dispatch(
        registerUser({
          first_name: firstName,
          last_name: lastName,
          email,
          password,
          gender: genderInput,
          bDay,
          bMonth,
          bYear,
        })
      );
      if (result.payload.token) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getDays = () => new Date(bYear, bMonth, 0).getDate();
  const years = Array.from(new Array(108), (value, index) => bYear - index);
  const months = Array.from(new Array(12), (value, index) => index + 1);
  const days = Array.from(new Array(getDays()), (value, index) => index + 1);

  return (
    <div className={cx("modal")}>
      <div className={cx("register_form")}>
        <h1 className={cx("register_heading")}>Đăng ký</h1>
        <span className={cx("register_title")}>Nhanh chóng và dễ dàng.</span>
        <div className={cx("exit_icon")} onClick={() => setVisible(false)}>
          <i className="exit_icon"></i>
        </div>
        <span className={cx("divider")}></span>
        {errorRegister && <span className={cx("error")}>{errorRegister}</span>}
        <div className={cx("name-wrap")}>
          <InputForm
            type="text"
            placeholder="Họ"
            small
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <InputForm
            type="text"
            placeholder="Tên"
            small
            className={cx("custom_input")}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <InputForm
          type="text"
          placeholder="Email"
          small
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputForm
          type="password"
          placeholder="Mật khẩu mới"
          small
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={cx("reg_col")}>
          <div className={cx("reg_line_header")}>
            <span>Ngày sinh</span>
            <i className="info_icon"></i>
          </div>
          <div className={cx("reg_grid")}>
            <select
              name="bDay"
              className={cx("select")}
              value={bDay}
              onChange={(e) => setBDay(e.target.value)}
            >
              {days.map((year, index) => (
                <option key={index}>{year}</option>
              ))}
            </select>
            <select
              name="bMonth"
              className={cx("select")}
              value={bMonth}
              onChange={(e) => setBMonth(e.target.value)}
            >
              {months.map((year, index) => (
                <option key={index}>{year}</option>
              ))}
            </select>
            <select
              name="bYear"
              className={cx("select")}
              value={bYear}
              onChange={(e) => setBYear(e.target.value)}
            >
              {years.map((year, index) => (
                <option key={index}>{year}</option>
              ))}
            </select>
          </div>
        </div>
        <div className={cx("reg_col")}>
          <div className={cx("reg_line_header")}>
            <span>Giới tính</span>
            <i className="info_icon"></i>
          </div>
          <div className={cx("reg_grid")}>
            {gender.map((item, index) => (
              <div className={cx("gender")} key={index}>
                <label htmlFor={item.value}>{item.label}</label>
                <input
                  value={item.value}
                  type="radio"
                  id={item.value}
                  checked={item.value === genderInput}
                  onChange={(e) => setGenderInput(e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={cx("reg_info")}>
          <span>
            Người dùng dịch vụ của chúng tôi có thể đã tải thông tin liên hệ của
            bạn lên Facebook.
            <Link to="/">Tìm hiểu thêm</Link>
          </span>
          <span>
            Bằng cách nhấp vào Đăng ký, bạn đồng ý với
            <Link to="/">Điều khoản</Link>,
            <Link to="/">Chính sách quyền riêng tư</Link>,
            <Link to="/">Chính sách cookie</Link>
            của chúng tôi. Bạn có thể nhận được thông báo của chúng tôi qua SMS
            và hủy nhận bất kỳ lúc nào.
          </span>
        </div>
        <button className={cx("create_account_btn")} onClick={handleSubmit}>
          Đăng ký
        </button>
        {user.message && <span className={cx("success")}>{user.message}</span>}
      </div>
    </div>
  );
}

export default RegisterForm;
