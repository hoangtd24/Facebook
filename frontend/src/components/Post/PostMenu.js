import classNames from "classnames/bind";
import styles from "./Post.module.scss";
import PostMenuItem from "./PostMenuItem";
import images from "../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../features/post/postSlice";
import { deletePostProfile } from "../../features/user/userSlice";
const cx = classNames.bind(styles);
function PostMenu({ post, setVisiblePostMenu }) {
  const { user } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const handleDelete = async () => {
    const result = await dispatch(
      deletePost({
        id: post._id,
        token: user.token,
      })
    );
    dispatch(deletePostProfile(result.payload));
    setVisiblePostMenu(false);
  };
  return (
    <div className={cx("post_menu")}>
      {post.user?._id === user.id && (
        <PostMenuItem
          icon="pin_icon"
          title="Ghim bài viết"
          invert={theme === "dark"}
        />
      )}
      <PostMenuItem
        icon="save_icon"
        title="Lưu bài viết"
        subtitle="Thêm vào danh sách mục đã lưu"
        invert={theme === "dark"}
      />
      {post.user?._id === user.id && (
        <PostMenuItem
          icon="edit_icon"
          title="Chỉnh sửa bài viết"
          invert={theme === "dark"}
        />
      )}
      {post.user?._id !== user.id && (
        <PostMenuItem
          icon="turnOnNotification_icon"
          title="Bật thông báo về bài viết này"
          invert={theme === "dark"}
        />
      )}
      {post.user?._id !== user.id && (
        <PostMenuItem
          image={images.hide}
          title="Ẩn bài viết"
          subtitle="Ẩn các bài viết tương tự"
          invert={theme === "dark"}
        />
      )}
      {post.user?._id !== user.id && (
        <PostMenuItem
          image={images.clock}
          title={`Tạm ẩn ${post.user?.first_name} trong 30 ngày`}
          subtitle="Tạm thời dừng xem bài viết"
          invert={theme === "dark"}
        />
      )}
      {post.user?._id === user.id && (
        <PostMenuItem
          icon="turnOffNotifications_icon"
          title="Tắt thông báo về bài viết này"
          invert={theme === "dark"}
        />
      )}
      <PostMenuItem
        image={images.notice}
        title="Báo cáo bài viết"
        subtitle="Tôi lo ngại về bài viết này"
        invert={theme === "dark"}
      />
      <PostMenuItem
        icon="translate_icon"
        title="Tắt bản dịch"
        invert={theme === "dark"}
      />
      {post.user?._id === user.id && (
        <PostMenuItem
          icon="archive_icon"
          title="Chuyển vào kho lưu trữ"
          invert={theme === "dark"}
        />
      )}
      {post.user?._id === user.id && (
        <PostMenuItem
          icon="trash_icon"
          title="Chuyển vào thùng rác"
          subtitle="Các mục trong thùng rác sẽ bị xóa trong 30 ngày"
          onClick={handleDelete}
          invert={theme === "dark"}
        />
      )}
    </div>
  );
}

export default PostMenu;
