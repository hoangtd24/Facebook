import classNames from "classnames/bind";
import styles from "./CommentItem.module.scss";

const cx = classNames.bind(styles);
function CommentItem() {
  return <div className={cx("comment-wrapper")}>CommentItem</div>;
}

export default CommentItem;
