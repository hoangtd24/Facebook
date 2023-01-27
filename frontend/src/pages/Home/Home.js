import { CircularProgress } from "@mui/material";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreatePost from "../../components/CreatePost/CreatePost";
import LeftHome from "../../components/Home/Left/LeftHome";
import RightHome from "../../components/Home/Right/RightHome";
import Post from "../../components/Post/Post";
import Story from "../../components/Story/Story";
import { getAllPost } from "../../features/post/postSlice";
import { getInfoFriendPage } from "../../features/user/userSlice";
import AddFriendItem from "../Friends/AddFriendItem";
import styles from "./Home.module.scss";

const cx = classNames.bind(styles);
function Home() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { posts, loading } = useSelector((state) => state.post);
  const { friends, people, sends } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(getAllPost({ token: user.token }));
    dispatch(
      getInfoFriendPage({
        token: user.token,
      })
    );
  }, []);
  return (
    <div className={cx("wrapper")}>
      <LeftHome />
      <div className={cx("container")}>
        <div className={cx("content")}>
          <Story />
          <CreatePost />
          {sends.length == 0 && friends.length == 0 && (
            <div className={cx("suggest_add-friend")}>
              <div className={cx("friends_right-header")}>
                Những người bạn có thể biết
              </div>
              <div className={cx("friends_right-list")}>
                {people.map((user, index) => (
                  <AddFriendItem friend={user} key={index} custom />
                ))}
              </div>
            </div>
          )}
          {loading ? (
            <div className={cx("loading")}>
              <CircularProgress />
            </div>
          ) : (
            <div className={cx("posts")}>
              {posts.length > 0 ? (
                posts.map((post, index) => <Post key={index} post={post} />)
              ) : (
                <div className={cx("no-post")}>
                  <p>Chưa có bài viết nào</p>
                  <span>Hãy tự tạo bài viết hoặc theo dõi người khác</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <RightHome />
    </div>
  );
}

export default Home;
