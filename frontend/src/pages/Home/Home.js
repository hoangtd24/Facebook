import classNames from "classnames";
import LeftHome from "../../components/Home/Left/LeftHome";
import styles from "./Home.module.scss";

const cx = classNames.bind(styles);
function Home() {
  return (
    <div className={cx("wrapper")}>
      <LeftHome />
    </div>
  );
}

export default Home;
