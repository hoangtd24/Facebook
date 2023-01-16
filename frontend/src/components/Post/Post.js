import classNames from "classnames/bind";
import { Dots, Public } from "../../svg";
import styles from "./Post.module.scss";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import HeadlessTippy from "@tippyjs/react/headless";
import { reacts } from "../../data/reacts";
import CreateComment from "../Comment/CreateComment/CreateComment";
import PostMenu from "./PostMenu";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getReacts,
  reactPost,
  unreactPost,
} from "../../features/post/postSlice";
import PostCount from "./PostCount";
import CommentItem from "../Comment/CommentItem/CommentItem";

const cx = classNames.bind(styles);

function Post({ post }) {
  const [visiblePostMenu, setVisiblePostMenu] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [check, setCheck] = useState("");
  const [reactOfPost, setReactOfPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [seeMore, setSeeMore] = useState(false);
  const dispatch = useDispatch();
  const handleReact = (param) => {
    setCheck(param.react);
    const newReactPost = reactOfPost.filter((item) => item.reactBy !== user.id);
    setReactOfPost([
      {
        react: param.react,
        post: post._id,
        reactBy: user.id,
      },
      ...newReactPost,
    ]);
    dispatch(reactPost(param));
  };

  const handleLike = () => {
    if (check) {
      setCheck("");
      const newReactPost = reactOfPost.filter(
        (item) => item.reactBy !== user.id
      );
      setReactOfPost(newReactPost);
      dispatch(
        unreactPost({
          postId: post._id,
          token: user.token,
        })
      );
    } else {
      setCheck("like");
      setReactOfPost((prev) => [
        ...prev,
        {
          react: "like",
          post: post._id,
          reactBy: user.id,
        },
      ]);
      dispatch(
        reactPost({
          postId: post._id,
          react: "like",
          token: user.token,
        })
      );
    }
  };

  useEffect(() => {
    const getReactPost = async () => {
      const result = await dispatch(
        getReacts({
          token: user.token,
          postId: post._id,
        })
      );
      setCheck(result.payload.check);
      setReactOfPost(result.payload.reacts);
    };
    setComments(post.comments);
    getReactPost();
  }, [post]);
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
              <Link to={`/profile/${post.user._id}`}>
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
                <PostMenu post={post} setVisiblePostMenu={setVisiblePostMenu} />
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
          <Link to={`/post/${post._id}`}>
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
          </Link>
        ) : (
          <div
            className={cx("post_bg")}
            style={{ backgroundImage: `url("${post.background}")` }}
          >
            <span className={cx("post_content_text")}>{post.text}</span>
          </div>
        )}
      </div>
      <PostCount reactOfPost={reactOfPost} post={post} />
      <div className={cx("post_actions")}>
        <HeadlessTippy
          interactive
          placement="top-start"
          delay={[600, 300]}
          render={(attrs) => (
            <div className="box" tabIndex="-1" {...attrs}>
              <div className={cx("react_popup")}>
                {reacts.map((react, index) => (
                  <div
                    className={cx("react")}
                    key={index}
                    onClick={() =>
                      handleReact({
                        postId: post._id,
                        react: react.title,
                        token: user.token,
                      })
                    }
                  >
                    <img src={react.icon} alt="" />
                    <div className={cx("react_name")}>{react.name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        >
          <div className={cx("post_action")} onClick={() => handleLike()}>
            {check ? (
              <div className={cx(`post_action-${check}`)}>
                <img
                  src={`../../../reacts/${check}.svg`}
                  className={cx("react_icon")}
                />
                <span>
                  {check === "like"
                    ? "Thích"
                    : check === "haha"
                    ? "Haha"
                    : check === "wow"
                    ? "Wow"
                    : check === "love"
                    ? "Yêu thích"
                    : check === "sad"
                    ? "Buồn"
                    : "Phẫn nộ"}
                </span>
              </div>
            ) : (
              <>
                <i className={cx("like_icon")}></i>
                <span>Thích</span>
              </>
            )}
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
      <CreateComment post={post} setComments={setComments} />
      {comments.length > 1 && !seeMore && (
        <p className={cx("see_more-btn")} onClick={() => setSeeMore(true)}>
          Xem {comments.length - 1} bình luận trước
        </p>
      )}
      <div className={cx("comment_wrapper")}>
        {!seeMore
          ? comments
              .slice(-1)
              .map((comment, index) => (
                <CommentItem comment={comment} key={index} />
              ))
          : comments.map((comment, index) => (
              <CommentItem comment={comment} key={index} />
            ))}
      </div>
    </div>
  );
}

export default Post;
