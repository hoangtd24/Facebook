import { CircularProgress } from "@mui/material";
import TextField from "@mui/material/TextField";
import classNames from "classnames/bind";
import Cookies from "js-cookie";
import { useCallback, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAvatar } from "../../features/auth/authSlice";
import { createPost } from "../../features/post/postSlice";
import { uploadImages } from "../../features/upload/uploadSlice";
import { updateProfilePicture } from "../../features/user/userSlice";
import getCroppedImg from "../../helpers/getCroppedImg";
import Button from "../Button/Button";
import styles from "./UpdateProfile.module.scss";

const cx = classNames.bind(styles);
function UpdateProfile({ setOpen, setChange }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const sliderRef = useRef(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  const zoomOut = () => {
    sliderRef.current.stepUp();
    setZoom(sliderRef.current.value);
  };
  const zoomIn = () => {
    sliderRef.current.stepDown();
    setZoom(sliderRef.current.value);
  };
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
  const handlePreviewImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setImage(event.target.result);
    };
  };

  const updateProfile = async () => {
    try {
      const img = await getCroppedImage();
      const blob = await fetch(img).then((b) => b.blob());
      const path = `${user.id}/profile_picture`;
      const formData = new FormData();
      formData.append("path", path);
      formData.append("file", blob);
      setLoading(true);
      const res = await dispatch(uploadImages(formData, path, user.token));
      const url = await dispatch(
        updateProfilePicture({
          url: res.payload[0].url,
          token: user.token,
        })
      );
      await dispatch(
        createPost({
          type: "profilePicture",
          text: text,
          user: user.id,
          images: res.payload[0],
          token: user.token,
          background: `../../../images/postBackgrounds/0.jpg`,
        })
      );
      dispatch(updateUserAvatar({ ...user, picture: res.payload[0].url }));
      Cookies.set(
        "user",
        JSON.stringify({ ...user, picture: res.payload[0].url })
      );
      setLoading(false);
      setOpen(false);
      setChange((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("popup_header")}>
        <span>Cập nhập ảnh đại diện</span>
        <div className={cx("circle-icon")}>
          <i className={cx("exit_icon")}></i>
        </div>
      </div>
      {image.length > 0 ? (
        <div className={cx("popup_content")}>
          <TextField
            id="outlined-basic"
            label="Mô tả"
            variant="outlined"
            multiline
            fullWidth
            margin="normal"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className={cx("cropper")}>
            <Cropper
              image={image}
              crop={crop}
              cropShape="round"
              zoom={zoom}
              aspect={1 / 1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              showGrid={false}
              cropSize={{ width: 300, height: 300 }}
            />
          </div>
          <div className={cx("slider")}>
            <div className={cx("slider-circle")} onClick={() => zoomIn()}>
              <i className={cx("minus_icon")}></i>
            </div>
            <input
              type="range"
              min="1"
              max="3"
              step="0.02"
              value={zoom}
              ref={sliderRef}
              onChange={(e) => setZoom(e.target.value)}
            />
            <div className={cx("slider-circle")} onClick={() => zoomOut()}>
              <i className={cx("plus_icon")}></i>
            </div>
          </div>
          <div className={cx("popup_content-actions")}>
            <Button icon="crop_icon" onClick={() => getCroppedImage("show")}>
              Cắt ảnh
            </Button>
            <Button icon="temp_icon">Để tạm thời</Button>
          </div>
        </div>
      ) : (
        <div className={cx("actions")}>
          <div
            className={cx("upload-btn")}
            onClick={() => inputRef.current.click()}
          >
            <i className={cx("plus_icon")}></i>
            <span>Tải ảnh lên</span>
          </div>
          <div className={cx("frame_btn")}>
            <i className={cx("frame_icon")}></i>
            <span>Thêm khung</span>
          </div>
          <input
            type="file"
            hidden
            onChange={handlePreviewImage}
            ref={inputRef}
          />
        </div>
      )}
      {image.length > 0 && (
        <div className={cx("popup_footer")}>
          <div className={cx("popup_footer-actions")}>
            <button className={cx("cancel_btn")}>Hủy</button>
            <Button primary onClick={() => updateProfile()}>
              Lưu
            </Button>
          </div>
        </div>
      )}
      {loading && (
        <div className={cx("loading")}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
}

export default UpdateProfile;
