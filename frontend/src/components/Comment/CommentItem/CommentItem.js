import classNames from "classnames/bind";
import Moment from "react-moment";
import styles from "./CommentItem.module.scss";

const cx = classNames.bind(styles);
function CommentItem({ comment }) {
  return (
    <div className={cx("wrapper")}>
      <img src={comment.commentBy.picture} alt="avatar_user_comment" />
      <div className={cx("comment_info")}>
        <div className={cx("comment_text")}>
          <p className={cx("comment_user")}>{comment.commentBy.username}</p>
          <span>{comment.comment}</span>
        </div>
        {comment.image && (
          <div
            className={cx("comment_img")}
            style={{
              backgroundImage: `url(
              "${comment.image}"
            )`,
            }}
          ></div>
        )}
        <div className={cx("comment_actions")}>
          <button>Thích</button>
          <button>Phản hồi</button>
          <div className={cx("update_at")}>
            <Moment fromNow interval={60}>
              {comment.commentAt}
            </Moment>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
