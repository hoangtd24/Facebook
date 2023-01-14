import classNames from "classnames/bind";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ActionItem from "../../components/ActionItem/ActionItem";
import { getInfoFriendPage } from "../../features/user/userSlice";
import AcceptFriendItem from "./AcceptFriendItem";
import AddFriendItem from "./AddFriendItem";
import FriendItem from "./FriendItem";
import styles from "./Friends.module.scss";

const cx = classNames.bind(styles);
function Friends() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { name } = useParams();
  console.log(name);
  const { friends, requests, sends, people } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    dispatch(
      getInfoFriendPage({
        token: user.token,
      })
    );
  }, []);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("friends_left")}>
        <div className={cx("friends_left-header")}>
          <span>Bạn bè</span>
          <div className={cx("circle_icon")}>
            <i className={cx("settings_filled_icon")}></i>
          </div>
        </div>
        <ActionItem
          icon="friends_home_icon"
          name="Trang chủ"
          active
          to="/friends"
        />
        <ActionItem
          icon="friends_requests_icon"
          name="Lời mời kết bạn"
          rightIcon
          auto
          to="/friends/requests"
        />
        <ActionItem
          icon="friends_suggestions_icon"
          name="Gợi ý"
          rightIcon
          auto
          to="/friends/suggests"
        />
        <ActionItem
          icon="all_friends_icon"
          name="Tất cả bạn bè"
          rightIcon
          auto
          to="/friends/list"
        />
        <ActionItem icon="birthdays_icon" name="Sinh nhật" />
        <ActionItem
          icon="all_friends_icon"
          name="Danh sách tùy chỉnh"
          rightIcon
          auto
        />
      </div>
      <div className={cx("friends_right")}>
        <div className={cx("friends_right-filter")}>
          <Link to="/friends/suggests">Gợi ý</Link>
          <Link to="/friends/list">Bạn bè</Link>
        </div>
        {(name === "requests" || !name) && (
          <>
            <div className={cx("friends_right-header")}>Lời mời kết bạn</div>
            <div className={cx("friends_right-list")}>
              {requests.map((user, index) => (
                <AcceptFriendItem friend={user} key={index} />
              ))}
            </div>
          </>
        )}
        {(name === "sends" || !name) && (
          <>
            <div className={cx("friends_right-header")}>Lời mời đã gửi</div>
            <div className={cx("friends_right-list")}>
              {sends.map((user, index) => (
                <FriendItem friend={user} key={index} send />
              ))}
            </div>
          </>
        )}
        {(name === "suggests" || !name) && (
          <>
            <div className={cx("friends_right-header")}>
              Những người bạn có thể biết
            </div>
            <div className={cx("friends_right-list")}>
              {people.map((user, index) => (
                <AddFriendItem friend={user} key={index} />
              ))}
            </div>
          </>
        )}

        {(name === "list" || !name) && (
          <>
            <div className={cx("friends_right-header")}>Bạn bè</div>
            <div className={cx("friends_right-list")}>
              {friends.map((user, index) => (
                <FriendItem friend={user} key={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Friends;
