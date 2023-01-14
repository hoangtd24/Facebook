import classNames from "classnames/bind";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { acceptRequest, deleteRequest } from "../../features/user/userSlice";
import styles from "./Friends.module.scss";

const cx = classNames.bind(styles);
function AcceptFriendItem({ friend }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [accept, setAccept] = useState(false);
  const [deleteRequest, setDeleteRequest] = useState(false);

  const handleAcceptRequest = async (data) => {
    setAccept(true);
    await dispatch(acceptRequest(data));
  };

  const handleDeleteRequest = async (data) => {
    setDelete(true)
    await dispatch(deleteRequest(data));
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
          <button
            className={cx("accept_btn", { invisible: accept || deleteRequest })}
            onClick={() =>
              handleAcceptRequest({
                id: friend._id,
                token: user.token,
              })
            }
          >
            Xác nhận
          </button>
          {accept ? (
            <button className={cx("delete_btn")}>Đã chấp nhận lời mời</button>
          ) : (
            <button
              className={cx("delete_btn")}
              onClick={() =>
                handleDeleteRequest({
                  id: friend._id,
                  token: user.token,
                })
              }
            >
              {deleteRequest ? "Đã xóa lời mời" : "Xóa"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AcceptFriendItem;
