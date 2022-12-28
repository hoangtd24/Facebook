import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProfile } from "../../features/user/userSlice";
import HeadlessTippy from "@tippyjs/react/headless";
import styles from "./Profile.module.scss";
import Button from "../../components/Button/Button";
import { Link, NavLink } from "react-router-dom";
import { Dots } from "../../svg";
import CreatePost from "../../components/CreatePost/CreatePost";
import GridView from "./GridView";
import Post from "../../components/Post/Post";
import Photos from "./Photos";
import Friends from "./Friends";

const cx = classNames.bind(styles);
function Profile() {
  const { profile } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [change, setChange] = useState(false);
  const [gridView, setGridView] = useState(1);
  const param = useParams();
  const dispatch = useDispatch();
  console.log(profile);
  useEffect(() => {
    dispatch(getProfile(param.idUser));
  }, [param.idUser]);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("profile_cover")}>
        <div className={cx("cover")}>
          {profile.cover && (
            <img src={profile.cover} className={cx("cover_img")} alt="" />
          )}
          {profile._id === user.id && (
            <HeadlessTippy
              visible={visibleMenu}
              interactive
              placement="bottom-end"
              onClickOutside={() => setVisibleMenu(false)}
              offset={[0, 2]}
              render={(attrs) => (
                <div className="box" tabIndex="-1" {...attrs}>
                  <div className={cx("menu_update")}>
                    <div className={cx("menu_update-item")}>
                      <i className={cx("photo_icon")}></i>
                      <p>Chọn ảnh</p>
                    </div>
                    <div className={cx("menu_update-item")}>
                      <i className={cx("upload_icon")}></i>
                      <p>Tải ảnh lên</p>
                    </div>
                    <div className={cx("menu_update-item")}>
                      <i className={cx("photo_icon")}></i>
                      <p>Chọn ảnh</p>
                    </div>
                  </div>
                </div>
              )}
            >
              <div
                className={cx("update_cover-btn")}
                onClick={() => setVisibleMenu(!visibleMenu)}
              >
                <i className={cx("camera_filled_icon")}></i>
                <p>Chỉnh sửa ảnh bìa</p>
              </div>
            </HeadlessTippy>
          )}
        </div>
      </div>
      <div className={cx("profile_infos")}>
        <div className={cx("profile_infos-wrap")}>
          <div className={cx("profile_infos-left")}>
            <div
              className={cx("profile_avatar")}
              style={{ backgroundImage: `url("${profile.picture}")` }}
            >
              <div className={cx("profile_avatar-update")}>
                <i className={cx("camera_filled_icon")}></i>
              </div>
            </div>
            <div className={cx("profile_name")}>
              <h1 className={cx("profile_username")}>{profile.username}</h1>
              <p className={cx("profile_friends")}>235 bạn bè</p>
            </div>
          </div>
          <div className={cx("profile_infos-right")}>
            <Button src="../../../icons/plus.png" primary>
              Thêm vào tin
            </Button>
            <Button icon="edit_icon" className={cx("edit_btn")}>
              Chỉnh sửa trang cá nhân
            </Button>
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
          <NavLink
            to={`/profile/${profile._id}/about`}
            className={({ isActive }) =>
              cx("profile_menu-item", { active: isActive })
            }
            end
          >
            <span className={cx("title")}>Giới thiệu</span>
          </NavLink>
          <NavLink
            to={`/profile/${profile._id}/friends`}
            className={({ isActive }) =>
              cx("profile_menu-item", { active: isActive })
            }
            end
          >
            <span className={cx("title")}>Bạn bè</span>
          </NavLink>
          <NavLink
            to={`/profile/${profile._id}/photos`}
            className={({ isActive }) =>
              cx("profile_menu-item", { active: isActive })
            }
            end
          >
            <span className={cx("title")}>Ảnh</span>
          </NavLink>
          <NavLink
            to={`/profile/${profile._id}/videos`}
            end
            className={({ isActive }) =>
              cx("profile_menu-item", { active: isActive })
            }
          >
            <span className={cx("title")}>Video</span>
          </NavLink>
          <NavLink
            to={`/profile/${profile._id}/checkin`}
            end
            className={({ isActive }) =>
              cx("profile_menu-item", { active: isActive })
            }
          >
            <span className={cx("title")}>Check in</span>
          </NavLink>
          <NavLink
            to={`/profile/${profile._id}/checkin`}
            end
            className={({ isActive }) =>
              cx("profile_menu-item", { active: isActive })
            }
          >
            <span className={cx("title")}>Xem thêm</span>
          </NavLink>
          <div className={cx("dots_btn")}>
            <Dots />
          </div>
        </div>
      </div>
      <div className={cx("profile_container")}>
        <div className={cx("profile_content")}>
          <div className={cx("profile_left")}>
            <Photos path={profile._id} />
            <Friends path={profile._id} />
          </div>
          <div className={cx("profile_right")}>
            <CreatePost profile change={change} setChange={setChange} />
            <GridView setGridView={setGridView} gridView={gridView} />
            <div className={cx("profile_posts")}>
              {profile.posts?.map((post, index) => (
                <Post key={index} post={post} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
