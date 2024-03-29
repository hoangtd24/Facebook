import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import CreatePost from "../../components/CreatePost/CreatePost";
import Intro from "../../components/Intro/Intro";
import Post from "../../components/Post/Post";
import UpdateProfile from "../../components/UpdateProfile/UpdateProfile";
import { getProfile } from "../../features/user/userSlice";
import { Dots } from "../../svg";
import Cover from "./Cover";
import Friends from "./Friends";
import FriendShip from "./FriendShip";
import GridView from "./GridView";
import Photos from "./Photos";
import styles from "./Profile.module.scss";

const cx = classNames.bind(styles);
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  maxWidth: "100%",
  transform: "translate(-50%, -50%)",
  border: "none",
  outline: "none",
};
function Profile() {
  const { profile } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.theme);
  const [open, setOpen] = useState(false);
  const [gridView, setGridView] = useState(1);
  const param = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getProfile({
        idUser: param.idUser,
        token: user.token,
      })
    );
  }, [param.idUser]);
  return (
    <div className={cx("wrapper")}>
      <Cover profile={profile} />
      <div className={cx("profile_infos")}>
        <div className={cx("profile_infos-wrap")}>
          <div className={cx("profile_infos-left")}>
            <div
              className={cx("profile_avatar")}
              style={{ backgroundImage: `url("${profile.picture}")` }}
            >
              {profile._id === user.id && (
                <div
                  className={cx("profile_avatar-update", {
                    invert: theme === "dark",
                  })}
                  onClick={() => setOpen(true)}
                >
                  <i className={cx("camera_filled_icon")}></i>
                </div>
              )}
            </div>
            <div className={cx("profile_name")}>
              <h1 className={cx("profile_username")}>{profile.username}</h1>
              <p className={cx("profile_friends")}>
                {profile.friends?.length} bạn bè
              </p>
              <div className={cx("profile_friend-imgs")}>
                {profile.friends &&
                  profile.friends.slice(0.8).map((friend) => (
                    <Link
                      to={`/profile/${friend._id}`}
                      key={friend._id}
                      className={cx("profile_friend-link")}
                    >
                      <div
                        className={cx("profile_friend-img")}
                        style={{ backgroundImage: `url("${friend.picture}")` }}
                      ></div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
          <div className={cx("profile_infos-right")}>
            {profile._id === user.id ? (
              <>
                <Button src="../../../icons/plus.png" primary invert>
                  Thêm vào tin
                </Button>
                <Button icon="edit_icon" className={cx("edit_btn")}>
                  Chỉnh sửa trang cá nhân
                </Button>
              </>
            ) : (
              <FriendShip friendship={profile?.friendship} id={param.idUser} />
            )}
          </div>
        </div>
        <div className={cx("divider")}></div>
        <div className={cx("profile_menu")}>
          <NavLink
            to={`/profile/${profile._id}`}
            className={({ isActive }) =>
              cx("profile_menu-item", { active: isActive })
            }
          >
            <span className={cx("title")}>Bài viết</span>
          </NavLink>
          <Link
            to={`/profile/${profile._id}`}
            className={cx("profile_menu-item")}
          >
            <span className={cx("title")}>Giới thiệu</span>
          </Link>
          <Link
            to={`/profile/${profile._id}`}
            className={cx("profile_menu-item")}
          >
            <span className={cx("title")}>Bạn bè</span>
          </Link>
          <Link
            to={`/profile/${profile._id}`}
            className={cx("profile_menu-item")}
          >
            <span className={cx("title")}>Ảnh</span>
          </Link>
          <Link
            to={`/profile/${profile._id}`}
            className={cx("profile_menu-item")}
          >
            <span className={cx("title")}>Video</span>
          </Link>
          <Link
            to={`/profile/${profile._id}`}
            className={cx("profile_menu-item")}
          >
            <span className={cx("title")}>Check in</span>
          </Link>
          <Link
            to={`/profile/${profile._id}`}
            className={cx("profile_menu-item")}
          >
            <span className={cx("title")}>Xem thêm</span>
          </Link>
          <div className={cx("dots_btn")}>
            <Dots />
          </div>
        </div>
      </div>
      <div className={cx("profile_container")}>
        <div className={cx("profile_content")}>
          <div className={cx("profile_left")}>
            <Intro details={profile.details} />
            <Photos path={profile._id} />
            <Friends path={profile._id} friends={profile.friends} />
          </div>
          <div className={cx("profile_right")}>
            <CreatePost profile />
            <GridView setGridView={setGridView} gridView={gridView} />
            {
              <div className={cx("profile_posts")}>
                {profile.posts?.map((post, index) => (
                  <Post key={index} post={post} />
                ))}
              </div>
            }
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }}>
          <UpdateProfile open={open} setOpen={setOpen} />
        </Box>
      </Modal>
    </div>
  );
}

export default Profile;
