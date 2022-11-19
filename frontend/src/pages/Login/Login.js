import classNames from "classnames/bind";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import InputForm from "../../components/InputForm/InputForm";
import { loginUser } from "../../features/auth/authSlice";
import styles from "./Login.module.scss";
import RegisterForm from "./Register/RegisterForm";

const cx = classNames.bind(styles);
function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const result = await dispatch(
        loginUser({
          email,
          password,
        })
      );
      console.log(result)
      if (result.payload.token) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={cx("login")}>
      <div className={cx("login_wrapper")}>
        <div className={cx("login_wrap")}>
          <div className={cx("login_about")}>
            <img src="../../icons/facebook.svg" alt="" className={cx("logo")} />
          </div>
          <span>
            Facebook giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống
            của bạn.
          </span>
        </div>
        <div className={cx("login_form")}>
          <div className={cx("form")}>
            <form>
              <InputForm
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                large
              />
              <InputForm
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                large
              />
              <button className={cx("login_btn")} onClick={handleLogin}>
                Đăng nhập
              </button>
            </form>
            <Link to="/" className={cx("forget_password")}>
              Quên mật khẩu?
            </Link>
            <span className={cx("divider")}></span>
            <button
              className={cx("create_account_btn")}
              onClick={() => setVisible(true)}
            >
              Tạo tài khoản mới
            </button>
          </div>
          <div className={cx("create_page")}>
            <Link>Tạo Trang </Link>
            dành cho người nổi tiếng, thương hiệu hoặc doanh nghiệp.
          </div>
        </div>
      </div>
      {visible && <RegisterForm setVisible={setVisible} />}
    </div>
  );
}

export default Login;
