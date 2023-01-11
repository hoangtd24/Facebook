import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreatePost from "../../components/CreatePost/CreatePost";
import LeftHome from "../../components/Home/Left/LeftHome";
import RightHome from "../../components/Home/Right/RightHome";
import Post from "../../components/Post/Post";
import Story from "../../components/Story/Story";
import { getAllPost } from "../../features/post/postSlice";
import styles from "./Home.module.scss";

const cx = classNames.bind(styles);
function Home() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(getAllPost({ token: user.token }));
  }, []);
  return (
    <div className={cx("wrapper")}>
      <LeftHome />
      <div className={cx("container")}>
        <div className={cx("content")}>
          <Story />
          <CreatePost />
          <div className={cx("posts")}>
            {posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </div>
        </div>
      </div>
      <RightHome />
    </div>
  );
}

export default Home;
