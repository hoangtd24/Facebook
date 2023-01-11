import { LinearProgress, Modal } from "@mui/material";
import { Box } from "@mui/system";
import HeadlessTippy from "@tippyjs/react/headless";
import axios from "axios";
import classNames from "classnames/bind";
import Cookies from "js-cookie";
import { useCallback, useEffect, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import { updateCoverPicture } from "../../features/auth/authSlice";
import { createPost } from "../../features/post/postSlice";
import { uploadImages } from "../../features/upload/uploadSlice";
import {
  addPostProfile,
  updateProfileCover,
} from "../../features/user/userSlice";
import getCroppedImg from "../../helpers/getCroppedImg";
import { Public } from "../../svg";
import styles from "./Profile.module.scss";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  maxWidth: "100%",
  transform: "translate(-50%, -50%)",
  border: "none",
  outline: "none",
};

const cx = classNames.bind(styles);
function Cover({ profile }) {
  const { user } = useSelector((state) => state.auth);
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [image, setImage] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(false);
  const [olderCover, setOlderCover] = useState([]);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const inputRef = useRef(null);
  const coverRef = useRef(null);

  useEffect(() => {
    setWidth(coverRef.current.clientWidth);
    setHeight(coverRef.current.clientWidth / 3);
  }, [window.innerWidth]);

  useEffect(() => {
    const getOlderCover = async () => {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/getListImage`,
        {
          path: `${user.id}/cover_picture`,
          sort: "desc",
          max: "30",
        }
      );
      setOlderCover(data.resources);
    };
    getOlderCover();
  }, []);
  //handle image to blob
  const handlePreviewImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setImage(event.target.result);
    };
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  const getCroppedImage = useCallback(
    async (show) => {
      try {
        const img = await getCroppedImg(image, croppedAreaPixels);
        if (show) {
          setZoom(1);
          setCrop({ x: 0, y: 0 });
          setImage(img);
        } else {
          return img;
        }
      } catch (error) {
        console.log(error);
      }
    },
    [croppedAreaPixels]
  );
  //update cover
  const update = async () => {
    try {
      setLoading(true);
      const img = await getCroppedImage();
      const blob = await fetch(img).then((b) => b.blob());
      const path = `${user.id}/cover_picture`;
      const formData = new FormData();
      formData.append("path", path);
      formData.append("file", blob);
      const res = await dispatch(uploadImages(formData, path, user.token));
      dispatch(updateProfileCover(res.payload[0].url));
      const url = await dispatch(
        updateCoverPicture({
          url: res.payload[0].url,
          token: user.token,
        })
      );
      const result = await dispatch(
        createPost({
          type: "cover",
          text: "",
          user: user.id,
          images: res.payload[0],
          token: user.token,
          background: `../../../images/postBackgrounds/0.jpg`,
        })
      );
      dispatch(addPostProfile(result.payload.post));
      Cookies.set(
        "user",
        JSON.stringify({ ...user, cover: res.payload[0].url })
      );
      setLoading(false);
      setImage("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={cx("profile_cover")}>
      {image.length > 0 && (
        <div className={cx("profile_cover-save")}>
          {loading && (
            <div className={cx("profile_cover-loading")}>
              <LinearProgress />
            </div>
          )}
          <div className={cx("save_change-left")}>
            <Public width="20px" height="20px" />
            <span>Ảnh bìa của bạn hiển thị công khai</span>
          </div>
          <div className={cx("save_change-right")}>
            <Button large onClick={() => setImage("")}>
              Hủy
            </Button>
            <Button primary large onClick={() => update()}>
              Lưu thay đổi
            </Button>
          </div>
        </div>
      )}
      <input type="file" hidden onChange={handlePreviewImage} ref={inputRef} />
      <div
        className={cx("cover")}
        ref={coverRef}
        style={{ backgroundImage: `url("${profile.cover}")` }}
      >
        {image && (
          <div className={cx("cover_cropper")}>
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={width / height}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              showGrid={false}
              objectFit="horizontal-cover"
              // cropSize={{ width: 1100, height: 300 }}
            />
          </div>
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
                  <div
                    className={cx("menu_update-item")}
                    onClick={() => {
                      setOpen(true);
                      setVisibleMenu(false);
                    }}
                  >
                    <i className={cx("photo_icon")}></i>
                    <p>Chọn ảnh</p>
                  </div>
                  <div
                    className={cx("menu_update-item")}
                    onClick={() => {
                      inputRef.current.click();
                      setVisibleMenu(false);
                    }}
                  >
                    <i className={cx("upload_icon")}></i>
                    <p>Tải ảnh lên</p>
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
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }}>
          <div className={cx("wrapper_popup")}>
            <div className={cx("popup_header")}>
              <span>Cập nhập ảnh bìa</span>
              <div className={cx("circle-icon")} onClick={() => setOpen(false)}>
                <i className={cx("exit_icon")}></i>
              </div>
            </div>
            {olderCover.length > 0 && (
              <div className={cx("suggest")}>
                <div className={cx("suggest_header")}>Ảnh gợi ý</div>
                <div className={cx("suggest_images")}>
                  {olderCover.slice(0, 6).map((img) => (
                    <img
                      src={img.url}
                      alt=""
                      key={img.asset_id}
                      onClick={() => {
                        setImage(img.url);
                        setOpen(false);
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Cover;
