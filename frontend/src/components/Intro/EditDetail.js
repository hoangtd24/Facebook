import { TextField } from "@mui/material";
import classNames from "classnames/bind";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDetails } from "../../features/user/userSlice";
import { Public } from "../../svg";
import Button from "../Button/Button";
import DetailItem from "./DetailItem";
import styles from "./Intro.module.scss";

const cx = classNames.bind(styles);
function EditDetail({ setOpen, details, info, setInfo }) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("popup_header")}>
        <span>Chỉnh sửa chi tiết</span>
        <div className={cx("circle-icon")} onClick={() => setOpen(false)}>
          <i className={cx("exit_icon")}></i>
        </div>
      </div>
      <div className={cx("popup_content")}>
        <div className={cx("edit_details-intro")}>
          <p className={cx("edit_intro-heading")}>Chỉnh sửa phần giới thiệu</p>
          <p className={cx("edit_intro-title")}>
            Chi tiết bạn chọn sẽ hiển thị công khai.
          </p>
        </div>
        <div className={cx("detail_item-heading")}>Công việc</div>
        <DetailItem
          title="Thêm tên công việc"
          icon="job"
          details={details}
          info={info}
          setInfo={setInfo}
          name="job"
        />
        <DetailItem
          title="Thêm nơi làm việc"
          icon="job"
          details={details}
          info={info}
          setInfo={setInfo}
          name="workplace"
        />
        <div className={cx("detail_item-heading")}>Học vấn</div>
        <DetailItem
          title="Thêm trường đại học"
          icon="studies"
          details={details}
          info={info}
          setInfo={setInfo}
          name="college"
        />
        <DetailItem
          title="Thêm trường trung học phổ thông"
          icon="studies"
          details={details}
          info={info}
          setInfo={setInfo}
          name="highSchool"
        />
        <div className={cx("detail_item-heading")}>Tỉnh/Thành phố hiện tại</div>
        <DetailItem
          title="Thêm thành phố hiện tại"
          icon="home"
          details={details}
          info={info}
          setInfo={setInfo}
          name="currentCity"
        />
        <div className={cx("detail_item-heading")}>Quê quán</div>
        <DetailItem
          title="Thêm quê quán"
          icon="location"
          details={details}
          info={info}
          setInfo={setInfo}
          name="hometown"
        />
        <div className={cx("detail_item-heading")}>Mối quan hệ</div>
        <DetailItem
          title="Thêm tình trạng mối quan hệ"
          icon="relationship"
          details={details}
          info={info}
          setInfo={setInfo}
          name="relationship"
          select
          array={[
            "Độc thân",
            "Hẹn hò",
            "Đã đính hôn",
            "Đã kết hôn",
            "Chung sống",
            "Tìm hiểu",
          ]}
        />
      </div>
    </div>
  );
}

export default EditDetail;
