import classNames from "classnames/bind";
import { useRef, useState } from "react";
import styles from "./ImagePreview.module.scss";

const cx = classNames.bind(styles);
function ImagePreview({ setPrev }) {
  const [images, setImages] = useState([]);
  const inputRef = useRef();

  const handlePreviewImage = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImages((prev) => [...prev, reader.result]);
      };
    });
  };
  return (
    <div className={cx("wrapper")}>
      <input
        type="file"
        multiple
        hidden
        ref={inputRef}
        onChange={handlePreviewImage}
      />
      <div className={cx("add_picture-wrap")}>
        {images.length > 0 ? (
          <div
            className={cx(
              "add_picture-content",
              (images.length > 2 && images.length % 2 === 0) ||
                images.length > 6
                ? "grid_layout-even"
                : "",
              images.length > 2 && images.length <= 6 && images.length % 2 !== 0
                ? "grid_layout-odd"
                : ""
            )}
          >
            {images.slice(0, 6).map((image, index) => (
              <div className={cx("img-preview")}>
                <img src={image} key={index} />
                {index === 5 && images.length > 6 && (
                  <div className={cx("blur")}>+{images.length - 6}</div>
                )}
              </div>
            ))}
            <div className={cx("add_exit-icon")} onClick={() => setPrev(false)}>
              <i className={cx("exit_icon")}></i>
            </div>
            <div className={cx("preview-actions")}>
              <button className={cx("action-btn")}>
                <i className={cx("edit_icon")}></i>
                <span>Chỉnh sửa tất cả</span>
              </button>
              <button
                className={cx("action-btn")}
                onClick={() => inputRef.current.click()}
              >
                <i className={cx("addPhoto_icon")}></i>
                <span>Thêm Ảnh/Video</span>
              </button>
            </div>
          </div>
        ) : (
          <div className={cx("add_picture-top")}>
            <div className={cx("add_exit-icon")} onClick={() => setPrev(false)}>
              <i className={cx("exit_icon")}></i>
            </div>
            <div
              className={cx("add_picture-col")}
              onClick={() => inputRef.current.click()}
            >
              <div className={cx("add_circle-icon")}>
                <i className={cx("addPhoto_icon")}></i>
              </div>
              <span>Thêm ảnh/Video</span>
              <span>hoặc kéo và thả</span>
            </div>
          </div>
        )}
        <div className={cx("add_picture-bottom")}>
          <div className={cx("add_circle-icon")}>
            <i className={cx("phone_icon")}></i>
          </div>
          <span className={cx("add_mobile-text")}>
            Thêm ảnh và video từ thiết bị di động.
          </span>
          <button className={cx("add-btn")}>Thêm</button>
        </div>
      </div>
    </div>
  );
}

export default ImagePreview;
