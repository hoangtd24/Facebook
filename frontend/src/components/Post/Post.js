import classNames from "classnames/bind";
import { Dots, Public } from "../../svg";
import styles from "./Post.module.scss";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import HeadlessTippy from "@tippyjs/react/headless";
import { reacts } from "../../data/reacts";
import CreateComment from "../Comment/CreateComment/CreateComment";
import PostMenu from "./PostMenu";
import { useState } from "react";

const cx = classNames.bind(styles);

function Post({ post }) {
  const [visiblePostMenu, setVisiblePostMenu] = useState(false);
  return (
    <div className={cx("post")}>
      <div className={cx("post_header")}>
        <div className={cx("post_header-left")}>
          <Link to={`/profile/${post.user._id}`} className={cx("wrap-avatar")}>
            <img
              src={post.user.picture}
              alt=""
              className={cx("post_user-avatar")}
            />
          </Link>
          <div className={cx("update_by")}>
            <div>
              <Link to={`profile/${post.user._id}`}>
                <span className={cx("post_username")}>
                  {post.user.username}
                </span>
              </Link>
              <span className={cx("post_type")}>
                {post.type === "profilePicture" &&
                  ` đã cập nhập ảnh đại diện của ${
                    post.user.gender === "male" ? "anh" : "cô"
                  } ấy`}
              </span>
              <span className={cx("post_type")}>
                {post.type === "cover" &&
                  ` đã cập nhập ảnh bìa của ${
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
          <HeadlessTippy
            visible={visiblePostMenu}
            interactive
            onClickOutside={() => setVisiblePostMenu(false)}
            placement="bottom-start"
            offset={[-300, 0]}
            render={(attrs) => (
              <div className="box" tabIndex="-1" {...attrs}>
                <PostMenu post={post} />
              </div>
            )}
          >
            <div
              className={cx("dots_icon")}
              onClick={() => setVisiblePostMenu(!visiblePostMenu)}
            >
              <Dots color="#828387" />
            </div>
          </HeadlessTippy>
          <div className={cx("add_exit-icon")} onClick={() => setPrev(false)}>
            <i className={cx("exit_icon")}></i>
          </div>
        </div>
      </div>
      <div className={cx("post_content")}>
        {post.background === "../../../images/postBackgrounds/0.jpg" ? (
          <>
            <span className={cx("post_content_text")}>{post.text}</span>
            {post.type === "profilePicture" ? (
              <div className={cx("post_profile-wrap")}>
                <div
                  className={cx("post_profile-cover")}
                  style={{ backgroundImage: `url("${post.user.cover}")` }}
                ></div>
                <div className={cx("post_profile-avatar")}>
                  <img src={post.images[0].url} />
                </div>
              </div>
            ) : (
              <div
                className={cx(
                  "add_picture-content",
                  `grid_layout_${
                    post.images.length < 6 ? post.images.length : 5
                  }`
                )}
              >
                {post.images.slice(0, 5).map((image, index) => {
                  return (
                    <div className={cx("img-preview")} key={index}>
                      <img src={image.url} key={index} />
                      {index === 4 && post.images.length > 5 && (
                        <div className={cx("blur")}>
                          +{post.images.length - 5}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
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
      <div className={cx("post_infos")}>
        <div className={cx("react_count")}>
          <div className={cx("react_count-img")}></div>
          <div className={cx("react_count-num")}></div>
        </div>
        <div className={cx("comment_count")}>4 bình luận</div>
        <div className={cx("share_count")}>0 lượt chia sẻ</div>
      </div>
      <div className={cx("post_actions")}>
        <HeadlessTippy
          interactive
          placement="top-start"
          render={(attrs) => (
            <div className="box" tabIndex="-1" {...attrs}>
              <div className={cx("react_popup")}>
                {reacts.map((react, index) => (
                  <div className={cx("react")} key={index}>
                    <img src={react.icon} alt="" />
                    <div className={cx("react_name")}>{react.name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        >
          <div className={cx("post_action")}>
            <i className={cx("like_icon")}></i>
            <span>Thích</span>
          </div>
        </HeadlessTippy>
        <div className={cx("post_action")}>
          <i className={cx("comment_icon")}></i>
          <span>Bình luận</span>
        </div>
        <div className={cx("post_action")}>
          <i className={cx("share_icon")}></i>
          <span>Chia sẻ</span>
        </div>
      </div>
      <CreateComment />
    </div>
  );
}

export default Post;
