import classNames from "classnames/bind";
import Cropper from "react-easy-crop";
import styles from "./UpdateProfile.module.scss";
import { useCallback, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "../Button/Button";

const cx = classNames.bind(styles);
function UpdateProfile() {
  const [image, setImage] = useState("");
  const inputRef = useRef(null);
  const sliderRef = useRef(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  console.log(zoom);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  }, []);
  const zoomOut = () => {
    sliderRef.current.stepUp();
    setZoom(sliderRef.current.value);
  };

  const zoomIn = () => {
    sliderRef.current.stepDown();
    setZoom(sliderRef.current.value);
  };
  const handlePreviewImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setImage(event.target.result);
    };
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
            <Button icon="crop_icon">Cắt ảnh</Button>
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
            <Button primary>Lưu</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdateProfile;
