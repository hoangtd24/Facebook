import classNames from "classnames/bind";
import { useState } from "react";
import { useSelector } from "react-redux";
import { left, shortcuts } from "../../../data/home";
import { ArrowDown1, ArrowUp } from "../../../svg";
import ActionItem from "../../ActionItem/ActionItem";
import styles from "./LeftHome.module.scss";
const cx = classNames.bind(styles);
function LeftHome() {
  const { user } = useSelector((state) => state.auth);
  const [seeMore, setSeeMore] = useState(false);
  const [seeMoreGroup, setSeeMoreGroup] = useState(false);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("home__left")}>
        <div className={cx("user__info")}>
          <ActionItem src={user.picture} name={user.username} />
        </div>
        {seeMore
          ? left.map((item, index) => (
              <ActionItem
                key={index}
                name={item.text}
                src={item.img}
                className={cx("custom_img")}
              />
            ))
          : left
              .slice(0, 5)
              .map((item, index) => (
                <ActionItem
                  key={index}
                  name={item.text}
                  src={item.img}
                  className={cx("custom_img")}
                />
              ))}
        {seeMore ? (
          <ActionItem
            iconSvg={<ArrowUp />}
            name="Ẩn bớt"
            onClick={() => setSeeMore(false)}
          />
        ) : (
          <ActionItem
            iconSvg={<ArrowDown1 />}
            name="Xem thêm"
            onClick={() => setSeeMore(true)}
          />
        )}
        <div className={cx("divider")}></div>
        <div className={cx("shortcuts")}>
          <p className={cx("shortcuts-title")}>Lối tắt của bạn</p>
          {seeMoreGroup
            ? shortcuts.map((item, index) => (
                <ActionItem
                  src={item.src}
                  name={item.name}
                  key={index}
                  className={cx("custom-img")}
                />
              ))
            : shortcuts
                .slice(0, 5)
                .map((item, index) => (
                  <ActionItem
                    src={item.src}
                    name={item.name}
                    key={index}
                    className={cx("custom-img")}
                  />
                ))}
          {seeMoreGroup ? (
            <ActionItem
              iconSvg={<ArrowUp />}
              name="Ẩn bớt"
              onClick={() => setSeeMoreGroup(false)}
            />
          ) : (
            <ActionItem
              iconSvg={<ArrowDown1 />}
              name="Xem thêm"
              onClick={() => setSeeMoreGroup(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default LeftHome;
