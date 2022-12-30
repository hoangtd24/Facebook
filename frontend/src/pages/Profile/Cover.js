import HeadlessTippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import { useCallback, useEffect, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import { Public } from "../../svg";
import styles from "./Profile.module.scss";

const cx = classNames.bind(styles);
function Cover({ profile }) {
  const { user } = useSelector((state) => state.auth);
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [image, setImage] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [width, setWidth] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const inputRef = useRef(null);
  const coverRef = useRef(null);

  useEffect(() => {
    setWidth(coverRef.current.clientWidth);
  }, [window.innerWidth]);
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
  return (
    <div className={cx("profile_cover")}>
      {image.length > 0 && (
        <div className={cx("profile_cover-save")}>
          <div className={cx("save_change-left")}>
            <Public width="20px" height="20px" />
            <span>Ảnh bìa của bạn hiển thị công khai</span>
          </div>
          <div className={cx("save_change-right")}>
            {/* <Button large onClick={() => setImage("")}>Hủy</Button> */}
            <Button primary large>
              Lưu thay đổi
            </Button>
          </div>
        </div>
      )}
      <input type="file" hidden onChange={handlePreviewImage} ref={inputRef} />
      <div className={cx("cover")}>
        {profile.cover && image === "" && (
          <img src={profile.cover} className={cx("cover_img")} alt="" />
        )}
        <div className={cx("cover_cropper")} ref={coverRef}>
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={width / 350}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            showGrid={false}
            objectFit="horizontal-cover"
            // cropSize={{ width: 1100, height: 300 }}
          />
        </div>
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
                  <div
                    className={cx("menu_update-item")}
                    onClick={() => inputRef.current.click()}
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
    </div>
  );
}

export default Cover;
