import classNames from "classnames/bind";
import { Dots, Public } from "../../svg";
import styles from "./Post.module.scss";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Post({ post }) {
  return (
    <div className={cx("post")}>
      <div className={cx("post_header")}>
        <div className={cx("post_header-left")}>
          <img
            src={post.user.picture}
            alt=""
            className={cx("post_user-avatar")}
          />
          <div className={cx("update_by")}>
            <div>
              <Link to={`profile/${post.user._id}`}>
                <span className={cx("post_username")}>
                  {post.user.username}
                </span>
              </Link>
              <span className={cx("post_type")}>
                {post.type === "profilePicture" &&
                  `đã cập nhập ảnh đại diện của ${
                    post.user.gender === "male" ? "anh" : "cô"
                  } ấy`}
              </span>
              <span className={cx("post_type")}>
                {post.type === "cover" &&
                  `đã cập nhập ảnh bìa của ${
                    post.user.gender === "male" ? "anh" : "cô"
                  } ấy`}
              </span>
            </div>
            <div className={cx("post_date")}>
              <div className={cx("update_at")}>
                <Moment fromNow interval={30}>
                  {post.createdAt}
                </Moment>
              </div>
              <div className={cx("dot_link")}>.</div>
              <Public color="#828387" width="12px" height="12px" />
            </div>
          </div>
        </div>
        <div className={cx("post_header-right")}>
          <div className={cx("dots_icon")}>
            <Dots color="#828387" />
          </div>
          <div className={cx("add_exit-icon")} onClick={() => setPrev(false)}>
            <i className={cx("exit_icon")}></i>
          </div>
        </div>
      </div>
      <div className={cx("post_content")}>
        {post.background === "../../../images/postBackgrounds/0.jpg" ? (
          <>
            <span className={cx("post_content_text")}>{post.text}</span>
            <div
              className={cx(
                "add_picture-content",
                (post.images.length > 2 && post.images.length % 2 === 0) ||
                  post.images.length > 6
                  ? "grid_layout-even"
                  : "",
                post.images.length > 2 &&
                  post.images.length <= 6 &&
                  post.images.length % 2 !== 0
                  ? "grid_layout-odd"
                  : ""
              )}
            >
              {post.images.slice(0, 6).map((image, index) => {
                return (
                  <div className={cx("img-preview")} key={index}>
                    <img src={image.url} key={index} />
                    {index === 5 && post.images.length > 6 && (
                      <div className={cx("blur")}>
                        +{post.images.length - 6}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div
            className={cx("post_bg")}
            style={{ backgroundImage: `url("${post.background}")` }}
          >
            <span className={cx("post_content_text")}>{post.text}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Post;
