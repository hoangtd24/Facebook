import classNames from "classnames/bind";
import styles from "./InputForm.module.scss";

const cx = classNames.bind(styles);
function InputForm({type, placeholder, value, onChange, className, large, small, onBlur, onFocus}) {
    const classes = cx("input",{
        [className] : className,
        large,
        small,
    })
  return (
    <input
      type={type}
      placeholder={placeholder}
      className= {classes}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
}

export default InputForm;
