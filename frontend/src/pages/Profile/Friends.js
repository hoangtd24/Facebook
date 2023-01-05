import classNames from "classnames/bind";
import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getListImage } from "../../features/user/userSlice";
import styles from "./Profile.module.scss";

const cx = classNames.bind(styles);
function Friends({ path, friends }) {
  const dispatch = useDispatch();
  const { listImage } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(
      getListImage({
        path: `${path}/upload_images`,
        sort: "desc",
        max: "30",
      })
    );
  }, [path]);
  return (
    <div className={cx("profile_card")}>
      <div className={cx("profile_card-header")}>
        <Link className={cx("profile_card-heading")} to="/">
          Bạn bè
        </Link>
        <Link className={cx("profile_card-link")} to="/">
          Xem tất cả bạn bè
        </Link>
      </div>
      <div className={cx("profile_friends-grid")}>
        {friends?.length > 0 &&
          friends.slice(0, 9).map((friend, index) => (
            <Link className={cx("friend_item")} to={`/profile/${friend._id}`} key={index}>
              <div
                key={friend._id}
                className={cx("profile_photo-card")}
                style={{ backgroundImage: `url("${friend.picture}")` }}
              ></div>
              <span>{friend.username}</span>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Friends;
