import classNames from "classnames/bind";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getListImage } from "../../features/user/userSlice";
import styles from "./Profile.module.scss";

const cx = classNames.bind(styles);
function Photos({ path }) {
  const dispatch = useDispatch();
  const { listImage } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(
      getListImage({
        path: `${path}/upload_images`,
        sort: "desc",
        max: "30",
      })
    );
  }, [path]);
  return (
    <div className={cx("profile_card")}>
      <div className={cx("profile_card-header")}>
        <Link className={cx("profile_card-heading")} to="/">
          Ảnh
        </Link>
        <Link className={cx("profile_card-link")} to="/">
          Xem tất cả ảnh
        </Link>
      </div>
      <div className={cx("profile_card-grid")}>
        {listImage.length > 0 &&
          listImage.slice(0, 9).map((img, index) => (
            <div
              className={cx("profile_photo-card")}
              style={{ backgroundImage: `url("${img.url}")` }}
            >
            </div>
          ))}
      </div>
    </div>
  );
}

export default Photos;
