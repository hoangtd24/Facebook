import classNames from "classnames/bind";
import HeadlessTippy from "@tippyjs/react/headless";
import Button from "../../components/Button/Button";
import styles from "./Profile.module.scss";
import { useState } from "react";

const cx = classNames.bind(styles);
function FriendShip() {
  const friendship = {
    friends: true,
    following: false,
    requestSent: false,
    requestReceived: false,
  };
  const [visible, setVisible] = useState(false);
  return (
    <div className={cx("friendship")}>
      {friendship.friends ? (
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
                  <button className={cx("menu_friend-item")}>
                    <img src="../../../icons/unfollowOutlined.png" alt="" />
                    <span>Bỏ theo dõi</span>
                  </button>
                  <button className={cx("menu_friend-item")}>
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
        !friendship.requestSent &&
        !friendship.requestReceived && (
          <>
            <Button src="../../../icons/message.png">Nhắn tin</Button>
            <Button src="../../../icons/addFriend.png" primary invert>
              Thêm bạn bè
            </Button>
          </>
        )
      )}
      {friendship.requestSent ? (
        <>
          <Button src="../../../icons/cancelRequest.png" primary invert>
            Hủy lời mời
          </Button>
          <Button src="../../../icons/message.png" primary invert>
            Nhắn tin
          </Button>
        </>
      ) : (
        friendship.requestReceived && (
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
                      <span>Xác nhận</span>
                    </button>
                    <button className={cx("menu_friend-item")}>
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
