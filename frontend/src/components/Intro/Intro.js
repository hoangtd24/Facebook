import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../Button/Button";
import Edit from "./Edit";
import EditDetail from "./EditDetail";
import styles from "./Intro.module.scss";

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
function Intro({ details }) {
  const initial = {
    bio: details?.bio ? details.bio : "",
    job: details?.job ? details.job : "",
    workplace: details?.workplace ? details.workplace : "",
    highSchool: details?.highSchool ? details.highSchool : "",
    college: details?.college ? details.college : "",
    currentCity: details?.currentCity ? details.currentCity : "",
    hometown: details?.hometown ? details.hometown : "",
    relationship: details?.relationship ? details.relationship : "",
  };
  const [info, setInfo] = useState(initial);
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const { profile } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    setInfo(initial);
  }, [profile]);
  // console.log("info", info);
  // console.log("details", details);
  return (
    <div className={cx("profile_card")}>
      <div className={cx("profile_card-header")}>
        <div className={cx("profile_card-heading")}>Giới thiệu</div>
      </div>
      {show ? (
        <Edit
          value={details?.bio ? details.bio : ""}
          setShow={setShow}
          details={details}
          info={info}
          setInfo={setInfo}
          name="bio"
        />
      ) : (
        <div className={cx("bio")}>
          <span className={cx("bio_text")}>
            {details?.bio ? details.bio : ""}
          </span>
          {profile._id === user.id && (
            <Button className={cx("custom_btn")} onClick={() => setShow(true)}>
              {details?.bio ? "Chỉnh sửa tiểu sử" : "Thêm tiểu sử"}
            </Button>
          )}
        </div>
      )}
      {details?.workplace && (
        <div className={cx("info_item")}>
          <img src="../../../icons/job.png" alt="" />
          <span>{`Làm việc tại ${details?.workplace}`}</span>
        </div>
      )}
      {details?.job && (
        <div className={cx("info_item")}>
          <img src="../../../icons/job.png" alt="" />
          <span>{details?.job}</span>
        </div>
      )}
      {details?.college && (
        <div className={cx("info_item")}>
          <img src="../../../icons/studies.png" alt="" />
          <span>{`Đã học tại ${details?.college}`}</span>
        </div>
      )}
      {details?.highSchool && (
        <div className={cx("info_item")}>
          <img src="../../../icons/studies.png" alt="" />
          <span>{`Đã học tại ${details?.highSchool}`}</span>
        </div>
      )}
      {details?.currentCity && (
        <div className={cx("info_item")}>
          <img src="../../../icons/home.png" alt="" />
          <span>{`Sống tại ${details?.currentCity}`}</span>
        </div>
      )}
      {details?.hometown && (
        <div className={cx("info_item")}>
          <img src="../../../icons/location.png" alt="" />
          <span>{`Đến từ ${details?.hometown}`}</span>
        </div>
      )}
      {details?.relationship && (
        <div className={cx("info_item")}>
          <img src="../../../icons/relationship.png" alt="" />
          <span>{details?.relationship}</span>
        </div>
      )}
      {profile._id === user.id && (
        <div className={cx("edit_bio-detail")}>
          <Button className={cx("custom_btn")} onClick={() => setOpen(true)}>
            Chỉnh sửa chi tiết
          </Button>
          <Button className={cx("custom_btn")} onClick={() => setShowBio(true)}>
            Chỉnh sửa sở thích
          </Button>
        </div>
      )}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }}>
          <EditDetail
            setOpen={setOpen}
            details={details}
            info={info}
            setInfo={setInfo}
          />
        </Box>
      </Modal>
    </div>
  );
}

export default Intro;
