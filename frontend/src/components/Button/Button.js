import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Button.module.scss";

const cx = classNames.bind(styles);
function Button({
  to,
  href,
  onClick,
  auto,
  className,
  icon,
  iconSvg,
  children,
  src,
  primary,
  large,
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
    primary,
    large
  });
  return (
    <Comp className={classes} {...props}>
      {icon && (
        <span className={cx("circle-icon")}>
          <i className={cx(icon)}></i>
        </span>
      )}
      {iconSvg && <span className={cx("circle-icon")}>{iconSvg}</span>}
      {src && (
        <span className={cx("img")}>
          <img src={src} alt="" />
        </span>
      )}
      <span className={cx("name")}>{children}</span>
    </Comp>
  );
}

export default Button;
