import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import UserMenu from "../../components/Menu/UserMenu/UserMenu";
import PostMenu from "../../components/Post/PostMenu";


import HeadlessTippy from "@tippyjs/react/headless";
import CommentItem from "../../components/Comment/CommentItem/CommentItem";
import CreateComment from "../../components/Comment/CreateComment/CreateComment";
import PostCount from "../../components/Post/PostCount";
import { reacts } from "../../data/reacts";
import {
  getPost,
  getReacts,
  reactPost,
  unreactPost
} from "../../features/post/postSlice";
import { Dots, Messenger, Notifications, Public } from "../../svg";
import styles from "./PostDetail.module.scss";
import PostLeft from "./PostLeft";

const cx = classNames.bind(styles);
function PostDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { post } = useSelector((state) => state.post);
  const [check, setCheck] = useState("");
  const [reactOfPost, setReactOfPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [seeMore, setSeeMore] = useState(false);
  const [visiblePostMenu, setVisiblePostMenu] = useState(false);
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
      const post = await dispatch(
        getPost({
          id: id,
          token: user.token,
        })
      );
      const result = await dispatch(
        getReacts({
          token: user.token,
          postId: id,
        })
      );
      setCheck(result.payload.check);
      setReactOfPost(result.payload.reacts);
      setComments(post.payload.comments);
    };
    getReactPost();
  }, []);
  return (
    <div className={cx("wrapper")}>
      <PostLeft post={post} />
      <div className={cx("post-right")}>
        <div className={cx("header-right")}>
          <div className={cx("circle-icon")}>
            <Messenger />
          </div>
          <div className={cx("circle-icon")}>
            <Notifications />
          </div>
          <UserMenu />
        </div>
        <div className={cx("post_header")}>
          <div className={cx("post_header-left")}>
            <Link
              to={`/profile/${post.user?._id}`}
              className={cx("wrap-avatar")}
            >
              <img
                src={post.user?.picture}
                alt=""
                className={cx("post_user-avatar")}
              />
            </Link>
            <div className={cx("update_by")}>
              <div>
                <Link to={`/profile/${post.user?._id}`}>
                  <span className={cx("post_username")}>
                    {post.user?.username}
                  </span>
                </Link>
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
                  <PostMenu
                    post={post}
                    setVisiblePostMenu={setVisiblePostMenu}
                  />
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
          </div>
        </div>
        <div className={cx("post_content")}>
          <span className={cx("post_content_text")}>{post.text}</span>
          <PostCount
            reactOfPost={reactOfPost.length > 0 ? reactOfPost : []}
            post={post}
          />
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
          {comments.length > 4 && !seeMore && (
            <p className={cx("see_more-btn")} onClick={() => setSeeMore(true)}>
              Xem {comments.length - 4} bình luận trước
            </p>
          )}
          <div className={cx("comment_wrapper")}>
            {!seeMore
              ? comments
                  .slice(-4)
                  .map((comment, index) => (
                    <CommentItem comment={comment} key={index} />
                  ))
              : comments.map((comment, index) => (
                  <CommentItem comment={comment} key={index} />
                ))}
          </div>
          <CreateComment post={post} setComments={setComments} />
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
