import classNames from "classnames/bind";
import Button from "../../components/Button/Button";
import styles from "./Profile.module.scss";

const cx = classNames.bind(styles);
function GridView({ gridView, setGridView }) {
  return (
    <div className={cx("view_post")}>
      <div className={cx("view_post-top")}>
        <p className={cx("view_post-header")}>Bài viết</p>
        <div className={cx("view_post-actions")}>
          <Button icon="equalize_icon">Bộ lọc</Button>
          <Button icon="manage_icon">Quản lí bài viết</Button>
        </div>
      </div>
      <div className={cx("view_post-bottom")}>
        <div
          className={cx("view_post-type", { active: gridView === 1 })}
          onClick={() => setGridView(1)}
        >
          <i className={cx("list_icon", { filter: gridView === 1 })}></i>
          <span  className={cx("view_post-name")}>Xem theo danh sách</span>
        </div>
        <div
          className={cx("view_post-type", { active: gridView === 2 })}
          onClick={() => setGridView(2)}
        >
          <i className={cx("grid_icon", { filter: gridView === 2 })}></i>
          <span className={cx("view_post-name")}>Chế độ xem lưới</span>
        </div>
      </div>
    </div>
  );
}

export default GridView;
