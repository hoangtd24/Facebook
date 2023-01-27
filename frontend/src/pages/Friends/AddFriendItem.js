import classNames from "classnames/bind";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addFriend,
  cancelRequest,
  deletePeople,
} from "../../features/user/userSlice";
import styles from "./Friends.module.scss";

const cx = classNames.bind(styles);
function AddFriendItem({ friend, custom }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [sendRequests, setSendRequests] = useState(false);
  const handleAddFriend = async (data) => {
    setSendRequests(true);
    await dispatch(addFriend(data));
  };

  const handleCancelRequest = async (data) => {
    setSendRequests(false);
    await dispatch(cancelRequest(data));
  };

  return (
    <div className={cx("grid_item", { custom })}>
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
          {sendRequests ? (
            <>
              <button className={cx("accept_btn")}>Đã gửi lời mời</button>
              <button
                className={cx("delete_btn")}
                onClick={() =>
                  handleCancelRequest({
                    id: friend._id,
                    token: user.token,
                  })
                }
              >
                Hủy
              </button>
            </>
          ) : (
            <>
              <button
                className={cx("accept_btn")}
                onClick={() =>
                  handleAddFriend({
                    id: friend._id,
                    token: user.token,
                  })
                }
              >
                Thêm bạn bè
              </button>
              <button
                className={cx("delete_btn")}
                onClick={() =>
                  dispatch(
                    deletePeople({
                      id: friend._id,
                    })
                  )
                }
              >
                Xóa,gỡ bỏ
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddFriendItem;
