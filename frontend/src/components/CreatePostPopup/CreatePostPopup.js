import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./CreatePostPopup.module.scss";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import AddPost from "./AddPost";
import ImagePreview from "../ImagePreview/ImagePreview";

const cx = classNames.bind(styles);
function CreatePostPopup({ handleClose }) {
  const { user } = useSelector((state) => state.auth);
  const [picker, setPicker] = useState(false);
  const [prev, setPrev] = useState(false);
  const [text, setText] = useState("");
  const [cursorPosition, setCursorPosition] = useState();
  const textRef = useRef(null);
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
            <div className={cx("input_wrap")}>
              <div className={cx("text-wrap")}>
                <textarea
                  placeholder={`${user.lastname} ơi, bạn đang nghĩ gì thế?`}
                  maxLength="10000"
                  className={cx("post_input", { small: text.length >= 100 })}
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                  ref={textRef}
                ></textarea>
              </div>
            </div>
            <div className={cx("post_emoji")}>
              {picker && (
                <div className={cx("emoji_wrap")}>
                  <EmojiPicker
                    onEmojiClick={handleClick}
                    searchDisabled={true}
                    height={300}
                    previewConfig={{ showPreview: false }}
                  />
                </div>
              )}
              {text.length <= 100 && (
                <img src="../../../icons/colorful.png" alt="pick_color" />
              )}
              <i
                className={cx("emoji_icon_large")}
                onClick={() => setPicker(!picker)}
              ></i>
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
                {picker && (
                  <div className={cx("emoji_wrap")}>
                    <EmojiPicker
                      onEmojiClick={handleClick}
                      searchDisabled={true}
                      height={300}
                      previewConfig={{ showPreview: false }}
                    />
                  </div>
                )}
                <i
                  className={cx("emoji_icon_large")}
                  onClick={() => setPicker(!picker)}
                ></i>
              </div>
            </div>
            {/* add picture wrap */}
            {prev && <ImagePreview setPrev={setPrev} />}
          </>
        )}
      </div>
      <AddPost setPrev={setPrev} />
      <button className={cx("submit-btn", { primary: text.length > 0 })}>
        Đăng
      </button>
    </div>
  );
}

export default CreatePostPopup;
