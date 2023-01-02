import classNames from "classnames/bind";
import { useState } from "react";
import Edit from "./Edit";
import styles from "./Intro.module.scss";

const cx = classNames.bind(styles);
function DetailItem({ details, info, setInfo, name, title, icon,select, array }) {
  const [show, setShow] = useState(false);
  return (
    <div className={cx("detail_item")}>
      {details?.[name] ? (
        <div className={cx("detail_item-info")}>
          <img src={`../../../icons/${icon}.png`} />
          <span>{details?.[name]}</span>
          <div className={cx("edit_btn")} onClick={() => setShow(true)}>
            <i className={cx("edit_icon")}></i>
          </div>
        </div>
      ) : (
        <div className={cx("add_detail-item")} onClick={() => setShow(true)}>
          <i className={cx("rounded_plus_icon")}></i>
          <span>{title}</span>
        </div>
      )}
      {show && (
        <Edit
          value={details?.[name] ? details?.[name] : ""}
          setShow={setShow}
          details={details}
          info={info}
          setInfo={setInfo}
          name={name}
          select={select}
          array={array}
        />
      )}
    </div>
  );
}

export default DetailItem;
