import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import classNames from "classnames/bind";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDetails } from "../../features/user/userSlice";
import { Public } from "../../svg";
import Button from "../Button/Button";
import styles from "./Intro.module.scss";

const cx = classNames.bind(styles);
function Edit({ value, setShow, details, info, setInfo, name, select, array }) {
  const [text, setText] = useState(value);
  const [length, setLength] = useState(100);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleChangeInput = (e) => {
    setText(e.target.value);
  };
  const handleEdit = async () => {
    if (details) {
      const result = await dispatch(
        updateDetails({
          infos: { ...details, [name]: text },
          token: user.token,
        })
      );
    } else {
      const result = await dispatch(
        updateDetails({ infos: { ...info, [name]: text }, token: user.token })
      );
    }
    setShow(false);
  };
  return (
    <div className={cx("edit_bio-wrap")}>
      {select ? (
        <div style={{ position: "relative", marginBottom: "16px" }}>
          <Box>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={text}
                label="Trạng thái"
                onChange={handleChangeInput}
              >
                {array.map((item, index) => (
                  <MenuItem
                    value={item}
                    key={index}
                    onClick={handleChangeInput}
                  >
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </div>
      ) : (
        <>
          <TextField
            style={{ textAlign: "center" }}
            fullWidth
            multiline
            inputProps={{ maxLength: length }}
            value={text}
            onChange={handleChangeInput}
          />
          <span className={cx("text_remain")}>
            Còn {length - text.length} kí tự
          </span>
        </>
      )}
      <div className={cx("edit_bio-actions")}>
        <div className={cx("edit_bio-left")}>
          <Public color="#828387" width="20px" height="20px" />
          <span>Công khai</span>
        </div>
        <div className={cx("edit_bio-right")}>
          <Button
            onClick={() => {
              if (details) {
                setInfo(details);
              } else {
                setInfo(info);
              }
              setShow(false);
            }}
          >
            Hủy
          </Button>
          <Button primary={text.length} onClick={handleEdit}>
            Lưu
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Edit;
