import classNames from "classnames/bind";
import styles from "./CreateComment.module.scss";
import { useDispatch, useSelector } from "react-redux";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import HeadlessTippy from "@tippyjs/react/headless";
const cx = classNames.bind(styles);
function CreateComment() {
  const { user } = useSelector((state) => state.auth);
  const [cursorPosition, setCursorPosition] = useState();
  const [picker, setPicker] = useState(false);
  const [text, setText] = useState("");
  const [imgPreview, setImgPreview] = useState("");
  const textRef = useRef(null);
  const imgRef = useRef(null);

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

  const hanleChangeImg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setImgPreview(event.target.result);
    };
  };
  return (
    <div className={cx("comment_wrapper")}>
      <div className={cx("comment_wrapper-text")}>
        <div className={cx("comment_user-avatar")}>
          <img src={user.picture} alt="" />
        </div>
        <div className={cx("input_wrap")}>
          <input
            placeholder="Viết bình luận ..."
            type="text"
            ref={textRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input type="file" hidden ref={imgRef} onChange={hanleChangeImg} />
          <HeadlessTippy
            visible={picker}
            interactive
            placement="top-end"
            onClickOutside={() => setPicker(false)}
            render={(attrs) => (
              <div className="box" tabIndex="-1" {...attrs}>
                <div className={cx("emoji_picker")}>
                  <EmojiPicker
                    onEmojiClick={handleClick}
                    searchDisabled={true}
                    height={300}
                    previewConfig={{ showPreview: false }}
                  />
                </div>
              </div>
            )}
          >
            <div
              className={cx("comment_circle-icon")}
              onClick={() => setPicker(!picker)}
            >
              <i className={cx("emoji_icon")}></i>
            </div>
          </HeadlessTippy>
          <div
            className={cx("comment_circle-icon")}
            onClick={() => imgRef.current.click()}
          >
            <i className={cx("camera_icon")}></i>
          </div>
          <div className={cx("comment_circle-icon")}>
            <i className={cx("gif_icon")}></i>
          </div>
          <div className={cx("comment_circle-icon")}>
            <i className={cx("sticker_icon")}></i>
          </div>
        </div>
      </div>
      {imgPreview && (
        <div className={cx("comment_img")}>
          <img src={imgPreview} alt="" />
          <div
            className={cx("circle_exit-icon")}
            onClick={() => setImgPreview("")}
          >
            <i className={cx("exit_icon")}></i>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateComment;
