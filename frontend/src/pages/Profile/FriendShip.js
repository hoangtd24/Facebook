import classNames from "classnames/bind";
import HeadlessTippy from "@tippyjs/react/headless";
import Button from "../../components/Button/Button";
import styles from "./Profile.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptRequest,
  addFriend,
  cancelRequest,
  deleteRequest,
  follow,
  unfollow,
  unfriend,
} from "../../features/user/userSlice";

const cx = classNames.bind(styles);
function FriendShip({ friendship, id }) {
  const [visible, setVisible] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [friend, setFriend] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    setFriend(friendship);
  }, [friendship]);
  const handleAddFriend = async () => {
    setFriend({ ...friend, requestSent: true, following: true });
    await dispatch(addFriend({ id: id, token: user.token }));
  };

  const handleCancelRequest = async () => {
    setFriend({ ...friend, requestSent: false, following: false });
    await dispatch(cancelRequest({ id: id, token: user.token }));
  };

  const handleAcceptRequest = async () => {
    setFriend({
      ...friend,
      requestSent: false,
      requestReceived: false,
      following: true,
      friends: true,
    });
    await dispatch(acceptRequest({ id: id, token: user.token }));
    setVisible(false);
  };

  const handleDeleteRequest = async () => {
    setFriend({
      ...friend,
      requestSent: false,
      requestReceived: false,
      following: false,
      friends: false,
    });
    await dispatch(deleteRequest({ id: id, token: user.token }));
    setVisible(false);
  };

  const handleUnfriend = async () => {
    setFriend({
      ...friend,
      requestSent: false,
      requestReceived: false,
      following: false,
      friends: false,
    });
    await dispatch(unfriend({ id: id, token: user.token }));
    setVisible(false);
  };

  const handleFollow = async () => {
    setFriend({
      ...friend,
      following: true,
    });
    await dispatch(follow({ id: id, token: user.token }));
    setVisible(false);
  };

  const handleUnfollow = async () => {
    setFriend({
      ...friend,
      following: false,
    });
    await dispatch(unfollow({ id: id, token: user.token }));
    setVisible(false);
  };

  return (
    <div className={cx("friendship")}>
      {friend?.friends ? (
        <>
          <HeadlessTippy
            visible={visible}
            onClickOutside={() => setVisible(false)}
            interactive
            placement="bottom-start"
            render={(attrs) => (
              <div className="box" tabIndex="-1" {...attrs}>
                <div className={cx("menu_friend")}>
                  <button className={cx("menu_friend-item")}>
                    <img src="../../../icons/favoritesOutline.png" alt="" />
                    <span>Yêu thích</span>
                  </button>
                  <button className={cx("menu_friend-item")}>
                    <img src="../../../icons/editFriends.png" alt="" />
                    <span>Chỉnh sửa danh sách bạn bè</span>
                  </button>
                  {friend?.following ? (
                    <button
                      className={cx("menu_friend-item")}
                      onClick={() => handleUnfollow()}
                    >
                      <img src="../../../icons/unfollowOutlined.png" alt="" />
                      <span>Bỏ theo dõi</span>
                    </button>
                  ) : (
                    <button
                      className={cx("menu_friend-item")}
                      onClick={() => handleFollow()}
                    >
                      <img src="../../../icons/unfollowOutlined.png" alt="" />
                      <span>Theo dõi</span>
                    </button>
                  )}
                  <button
                    className={cx("menu_friend-item")}
                    onClick={() => handleUnfriend()}
                  >
                    <i className={cx("unfriend_outlined_icon")}></i>
                    <span>Hủy kết bạn</span>
                  </button>
                </div>
              </div>
            )}
          >
            <div onClick={() => setVisible(!visible)}>
              <Button src="../../../icons/friends.png">Bạn bè</Button>
            </div>
          </HeadlessTippy>
          <Button src="../../../icons/message.png" primary invert>
            Nhắn tin
          </Button>
        </>
      ) : (
        !friend?.requestSent &&
        !friend?.requestReceived && (
          <>
            <Button src="../../../icons/message.png">Nhắn tin</Button>
            <Button
              src="../../../icons/addFriend.png"
              primary
              invert
              onClick={() => handleAddFriend()}
            >
              Thêm bạn bè
            </Button>
          </>
        )
      )}
      {friend?.requestSent ? (
        <>
          <Button src="../../../icons/message.png" primary invert>
            Nhắn tin
          </Button>
          <Button
            src="../../../icons/cancelRequest.png"
            primary
            invert
            onClick={() => handleCancelRequest()}
          >
            Hủy lời mời
          </Button>
        </>
      ) : (
        friend?.requestReceived && (
          <>
            <HeadlessTippy
              visible={visible}
              onClickOutside={() => setVisible(false)}
              interactive
              placement="bottom-start"
              render={(attrs) => (
                <div className="box" tabIndex="-1" {...attrs}>
                  <div className={cx("menu_friend")}>
                    <button
                      className={cx("menu_friend-item")}
                      onClick={() => handleAcceptRequest()}
                    >
                      <span>Xác nhận</span>
                    </button>
                    <button
                      className={cx("menu_friend-item")}
                      onClick={() => handleDeleteRequest()}
                    >
                      <span>Xóa lời mời</span>
                    </button>
                  </div>
                </div>
              )}
            >
              <div onClick={() => setVisible(!visible)}>
                <Button src="../../../icons/friends.png" primary invert>
                  Phản hồi
                </Button>
              </div>
            </HeadlessTippy>
            <Button src="../../../icons/message.png" primary invert>
              Nhắn tin
            </Button>
          </>
        )
      )}
    </div>
  );
}

export default FriendShip;
