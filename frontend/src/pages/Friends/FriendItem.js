import classNames from "classnames/bind";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  acceptRequest,
  addFriend,
  cancelRequest,
  deleteRequest,
} from "../../features/user/userSlice";
import styles from "./Friends.module.scss";

const cx = classNames.bind(styles);
function FriendItem({ friend, send }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [cancelRequests, setcancelRequests] = useState(false);

  const handleCancelRequest = async (data) => {
    setcancelRequests(true);
    await dispatch(cancelRequest(data));
  };

  return (
    <div className={cx("grid_item")}>
      <div className={cx("friend_item")}>
        <div
          className={cx("friend_item-img")}
          style={{
            backgroundImage: `url("${friend.picture}")`,
          }}
        ></div>
        <div className={cx("friend_item-info")}>
          <Link
            to={`/profile/${friend._id}`}
            className={cx("friend_item-username")}
          >
            {friend.username}
          </Link>
          {send && (
            <>
              <button
                className={cx("accept_btn", { invisible: cancelRequests })}
                onClick={() =>
                  handleCancelRequest({
                    id: friend._id,
                    token: user.token,
                  })
                }
              >
                Hủy yêu cầu
              </button>
              {cancelRequests ? (
                <button className={cx("delete_btn")}>Đã hủy yêu cầu</button>
              ) : (
                <button className={cx("delete_btn")}>Xóa</button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default FriendItem;
