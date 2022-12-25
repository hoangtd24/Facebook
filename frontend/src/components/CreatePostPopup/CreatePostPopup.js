import CircularProgress from "@mui/material/CircularProgress";
import classNames from "classnames/bind";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createPost } from "../../features/post/postSlice";
import { uploadImages } from "../../features/upload/uploadSlice";
import dataURItoBlob from "../../helpers/dataURItoBlob";
import { ArrowUp } from "../../svg";
import ImagePreview from "../ImagePreview/ImagePreview";
import HeadlessTippy from "@tippyjs/react/headless";
import AddPost from "./AddPost";
import styles from "./CreatePostPopup.module.scss";

const postBackgrounds = [
  "../../../images/postBackgrounds/1.jpg",
  "../../../images/postBackgrounds/2.jpg",
  "../../../images/postBackgrounds/3.jpg",
  "../../../images/postBackgrounds/4.jpg",
  "../../../images/postBackgrounds/5.jpg",
  "../../../images/postBackgrounds/6.jpg",
  "../../../images/postBackgrounds/7.jpg",
  "../../../images/postBackgrounds/8.jpg",
  "../../../images/postBackgrounds/9.jpg",
  "../../../images/postBackgrounds/10.jpg",
];

const cx = classNames.bind(styles);
function CreatePostPopup({ handleClose, setChange, change }) {
  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.post);
  const { loadingUpload } = useSelector((state) => state.upload);
  const [picker, setPicker] = useState(false);
  const [prev, setPrev] = useState(false);
  const [showBgs, setShowBgs] = useState(false);
  const [currentBg, setCurrentBg] = useState(0);
  const [images, setImages] = useState([]);
  const [text, setText] = useState("");
  const [cursorPosition, setCursorPosition] = useState();
  const textRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
    textRef.current.focus();
    textRef.current.addEventListener("input", (e) => {
      textRef.current.style.height = "auto";
      textRef.current.style.height = textRef.current.scrollHeight + 10 + "px";
    });
  }, [cursorPosition]);

  const handleClick = ({ emoji }) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);

    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };

  const handlePost = async () => {
    if (images.length > 0) {
      const path = `${user.username}/upload images`;
      const postImages = images.map((image) => dataURItoBlob(image));
      let formData = new FormData();
      formData.append("path", path);
      postImages.forEach((image) => {
        formData.append("file", image);
      });
      const response = await dispatch(uploadImages(formData, path, user.token));
      await dispatch(
        createPost({
          type: null,
          text: text,
          user: user.id,
          images: response.payload,
          token: user.token,
          background: `../../../images/postBackgrounds/${currentBg}.jpg`,
        })
      );
    } else {
      await dispatch(
        createPost({
          type: null,
          text: text,
          user: user.id,
          token: user.token,
          background: `../../../images/postBackgrounds/${currentBg}.jpg`,
        })
      );
    }
    setChange(!change);
    handleClose();
  };
  return (
    <div className={cx("popup_wrapper")}>
      <div className={cx("popup_header")}>
        <span>Tạo bài viết</span>
        <div className={cx("circle-icon")} onClick={handleClose}>
          <i className={cx("exit_icon")}></i>
        </div>
      </div>
      <div className={cx("popup_profile")}>
        <Link to="/" className={cx("avatar-link")}>
          <div
            className={cx("avatar")}
            style={{ backgroundImage: `url(${user.picture})` }}
          ></div>
        </Link>
        <div className={cx("popup_wrap")}>
          <p className={cx("user-name")}>{user.username}</p>
          <div className={cx("popup_privacy")}>
            <img src="../../../icons/public.png" alt="public_icon" />
            <span>Công khai</span>
            <i className={cx("arrowDown_icon")}></i>
          </div>
        </div>
      </div>
      <div className={cx("post_content")}>
        {!prev ? (
          <>
            <div
              className={cx("input_wrap")}
              style={{
                backgroundImage: `url("../../../images/postBackgrounds/${currentBg}.jpg")`,
                height: `${currentBg > 0 ? "300px" : ""}`,
              }}
            >
              <div className={cx("text-wrap")}>
                <textarea
                  placeholder={`${user.lastname} ơi, bạn đang nghĩ gì thế?`}
                  maxLength="10000"
                  className={cx(
                    "post_input",
                    { small: text.length >= 100 },
                    { center: currentBg > 0 }
                  )}
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                    if (text.length > 150) {
                      setCurrentBg(0);
                      setShowBgs(false);
                    }
                  }}
                  ref={textRef}
                ></textarea>
              </div>
            </div>
            <div className={cx("post_emoji")}>
              {text.length <= 150 && !showBgs && (
                <img
                  src="../../../icons/colorful.png"
                  alt="pick_color"
                  className={cx("emoji_color")}
                  onClick={() => setShowBgs(!showBgs)}
                />
              )}
              {showBgs && (
                <>
                  <span
                    className={cx("arrow-left")}
                    onClick={() => setShowBgs(!showBgs)}
                  >
                    <ArrowUp />
                  </span>
                  <div
                    className={cx("no_bg", { active: currentBg === 0 })}
                    onClick={() => setCurrentBg("0")}
                  ></div>
                  {postBackgrounds.map((bg, index) => (
                    <div
                      style={{
                        backgroundImage: `url(${bg})`,
                      }}
                      key={index}
                      onClick={() => setCurrentBg(index + 1)}
                      className={cx("emoji_bgs", {
                        active: currentBg === index + 1,
                      })}
                    ></div>
                  ))}
                </>
              )}
              <HeadlessTippy
                visible={picker}
                interactive
                placement="top-start"
                offset={[-300, 0]}
                onClickOutside={() => setPicker(false)}
                render={(attrs) => (
                  <div className="box" tabIndex="-1" {...attrs}>
                    <div className={cx("emoji_wrap")}>
                      <EmojiPicker
                        onEmojiClick={handleClick}
                        searchDisabled={true}
                        height={300}
                        width={300}
                        previewConfig={{ showPreview: false }}
                      />
                    </div>
                  </div>
                )}
              >
                <i
                  className={cx("emoji_icon_large")}
                  onClick={() => setPicker(!picker)}
                ></i>
              </HeadlessTippy>
            </div>
          </>
        ) : (
          <>
            <div className={cx("input_wrap", "custom-input_wrap")}>
              <div className={cx("text-wrap")}>
                <textarea
                  placeholder={`${user.lastname} ơi, bạn đang nghĩ gì thế?`}
                  maxLength="10000"
                  className={cx("post_input-prev", { small: true })}
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                  ref={textRef}
                ></textarea>
              </div>
              <div className={cx("post_emoji-prev")}>
                <HeadlessTippy
                  visible={picker}
                  interactive
                  placement="top-start"
                  offset={[-300, 0]}
                  onClickOutside={() => setPicker(false)}
                  render={(attrs) => (
                    <div className="box" tabIndex="-1" {...attrs}>
                      <div className={cx("emoji_wrap")}>
                        <EmojiPicker
                          onEmojiClick={handleClick}
                          searchDisabled={true}
                          height={300}
                          width={300}
                          previewConfig={{ showPreview: false }}
                        />
                      </div>
                    </div>
                  )}
                >
                  <i
                    className={cx("emoji_icon_large")}
                    onClick={() => setPicker(!picker)}
                  ></i>
                </HeadlessTippy>
              </div>
            </div>
            {/* add picture wrap */}
            {prev && (
              <ImagePreview
                setPrev={setPrev}
                images={images}
                setImages={setImages}
              />
            )}
          </>
        )}
      </div>
      <AddPost setPrev={setPrev} />
      <button
        className={cx("submit-btn", {
          primary: text.length > 0 || images.length > 0,
        })}
        onClick={handlePost}
      >
        Đăng
      </button>
      {loadingUpload && (
        <div className={cx("loading")}>
          <CircularProgress />
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

export default CreatePostPopup;
