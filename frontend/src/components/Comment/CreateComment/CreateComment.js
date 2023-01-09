import classNames from "classnames/bind";
import styles from "./CreateComment.module.scss";
import { useDispatch, useSelector } from "react-redux";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import HeadlessTippy from "@tippyjs/react/headless";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { comment } from "../../../features/post/postSlice";
import dataURItoBlob from "../../../helpers/dataURItoBlob";
import { uploadImages } from "../../../features/upload/uploadSlice";

const cx = classNames.bind(styles);
function CreateComment({ post, setComments }) {
  const { user } = useSelector((state) => state.auth);
  const [cursorPosition, setCursorPosition] = useState();
  const [picker, setPicker] = useState(false);
  const [text, setText] = useState("");
  const [imgPreview, setImgPreview] = useState("");
  const textRef = useRef(null);
  const imgRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
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

  const handleComment = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (imgPreview !== "") {
        const path = `${user.id}/upload_images`;
        const commentImg = dataURItoBlob(imgPreview);
        let formData = new FormData();
        formData.append("path", path);
        formData.append("file", commentImg);
        const response = await dispatch(
          uploadImages(formData, path, user.token)
        );
        const newComment = await dispatch(
          comment({
            postId: post._id,
            text: text,
            image: response.payload[0].url,
            token: user.token,
          })
        );
        setText("");
        setImgPreview("");
        setComments(newComment.payload);
      } else {
        if (text === "") {
          return;
        } else {
          const newComment = await dispatch(
            comment({
              postId: post._id,
              text: text,
              image: imgPreview,
              token: user.token,
            })
          );
          setText("");
          setImgPreview("");
          setComments(newComment.payload);
        }
      }
    }
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
          <TextareaAutosize
            size="small"
            ref={textRef}
            placeholder="Viết bình luận ..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={cx("post_input")}
            onKeyDown={(e) => handleComment(e)}
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
                    width={300}
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
