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
    await dispatch(acceptRequest({ id: id, token: user.token }));
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
    await dispatch(unfriend({ id: id, token: user.token }));
    setVisible(false);
  };

  const handleUnfollow = async () => {
    setFriend({
      ...friend,
      following: false,
    });
    await dispatch(unfriend({ id: id, token: user.token }));
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
                    <span>Y??u th??ch</span>
                  </button>
                  <button className={cx("menu_friend-item")}>
                    <img src="../../../icons/editFriends.png" alt="" />
                    <span>Ch???nh s???a danh s??ch b???n b??</span>
                  </button>
                  {friend?.following ? (
                    <button
                      className={cx("menu_friend-item")}
                      onClick={() => handleUnfollow}
                    >
                      <img src="../../../icons/unfollowOutlined.png" alt="" />
                      <span>B??? theo d??i</span>
                    </button>
                  ) : (
                    <button
                      className={cx("menu_friend-item")}
                      onClick={() => handleFollow()}
                    >
                      <img src="../../../icons/unfollowOutlined.png" alt="" />
                      <span>Theo d??i</span>
                    </button>
                  )}
                  <button
                    className={cx("menu_friend-item")}
                    onClick={() => handleUnfriend()}
                  >
                    <i className={cx("unfriend_outlined_icon")}></i>
                    <span>H???y k???t b???n</span>
                  </button>
                </div>
              </div>
            )}
          >
            <div onClick={() => setVisible(!visible)}>
              <Button src="../../../icons/friends.png">B???n b??</Button>
            </div>
          </HeadlessTippy>
          <Button src="../../../icons/message.png" primary invert>
            Nh???n tin
          </Button>
        </>
      ) : (
        !friend?.requestSent &&
        !friend?.requestReceived && (
          <>
            <Button src="../../../icons/message.png">Nh???n tin</Button>
            <Button
              src="../../../icons/addFriend.png"
              primary
              invert
              onClick={() => handleAddFriend()}
            >
              Th??m b???n b??
            </Button>
          </>
        )
      )}
      {friend?.requestSent ? (
        <>
          <Button src="../../../icons/message.png" primary invert>
            Nh???n tin
          </Button>
          <Button
            src="../../../icons/cancelRequest.png"
            primary
            invert
            onClick={() => handleCancelRequest()}
          >
            H???y l???i m???i
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
                      <span>X??c nh???n</span>
                    </button>
                    <button
                      className={cx("menu_friend-item")}
                      onClick={() => handleDeleteRequest()}
                    >
                      <span>X??a l???i m???i</span>
                    </button>
                  </div>
                </div>
              )}
            >
              <div onClick={() => setVisible(!visible)}>
                <Button src="../../../icons/friends.png" primary invert>
                  Ph???n h???i
                </Button>
              </div>
            </HeadlessTippy>
            <Button src="../../../icons/message.png" primary invert>
              Nh???n tin
            </Button>
          </>
        )
      )}
    </div>
  );
}

export default FriendShip;
