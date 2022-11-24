import classNames from "classnames/bind";
import CreatePost from "../../components/CreatePost/CreatePost";
import LeftHome from "../../components/Home/Left/LeftHome";
import RightHome from "../../components/Home/Right/RightHome";
import Story from "../../components/Story/Story";
import styles from "./Home.module.scss";

const cx = classNames.bind(styles);
function Home() {
  return (
    <div className={cx("wrapper")}>
      <LeftHome />
      <div className={cx("container")}>
        <div className={cx("content")}>
          <Story />
          <CreatePost />
        </div>
      </div>
      <RightHome />
    </div>
  );
}

export default Home;
