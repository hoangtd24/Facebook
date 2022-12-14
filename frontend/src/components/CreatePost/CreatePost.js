import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { Feeling, LiveVideo, Photo } from "../../svg";
import ActionItem from "../ActionItem/ActionItem";
import styles from "./CreatePost.module.scss";
import CreatePostPopup from "../CreatePostPopup/CreatePostPopup";
import "tippy.js/dist/tippy.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";

const cx = classNames.bind(styles);
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  border: "none",
  outline: "none",
};
function CreatePost() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { user } = useSelector((state) => state.auth);
  return (
    <div className={cx("create-post_wrap")}>
      <div className={cx("create-post_header")}>
        <div
          className={cx("user-avatar")}
          style={{ backgroundImage: `url(${user.picture})` }}
        ></div>
        <div className={cx("open-post")} onClick={handleOpen}>
          {user.lastname} ơi, Bạn đang nghĩ gì thế ?
        </div>
      </div>
      <span className={cx("divider")}></span>
      <div className={cx("actions")}>
        <ActionItem
          iconSvg={<LiveVideo color="#f3425f" />}
          name="Video trực tiếp"
          className={cx("custom-btn")}
        />
        <ActionItem
          iconSvg={<Photo color="#4bbf67" />}
          name="Ảnh/video"
          className={cx("custom-btn")}
        />
        <ActionItem
          iconSvg={<Feeling color="#f7b928" />}
          name="Feeling/activity"
          className={cx("custom-btn")}
        />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreatePostPopup handleClose={handleClose}/>
        </Box>
      </Modal>
    </div>
  );
}

export default CreatePost;
