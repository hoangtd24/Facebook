import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./ActionItem.module.scss";
import { ArrowRight } from "../../svg";

const cx = classNames.bind(styles);
function ActionItem({
  to,
  href,
  onClick,
  auto,
  className,
  icon,
  rightIcon,
  name,
  src,
  ...passProps
}) {
  let Comp = "button";
  const props = {
    onClick,
    src,
    ...passProps,
  };
  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = "a";
  }
  const classes = cx("wrapper", {
    [className]: className,
    auto,
  });
  return (
    <Comp className={classes} {...props}>
      {icon && (
        <span className={cx("circle-icon")}>
          <i className={cx(icon)}></i>
        </span>
      )}

      {src && (
        <span className={cx("img")}>
          <img src={src} alt="" />
        </span>
      )}
      <span className={cx("name")}>{name}</span>
      {rightIcon && (
        <span className={cx("right-icon", { auto })}>
          <i className={cx("right_icon")}></i>
        </span>
      )}
    </Comp>
  );
}

export default ActionItem;
