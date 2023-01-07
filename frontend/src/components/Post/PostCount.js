import classNames from "classnames/bind";
import styles from "./Post.module.scss";

const cx = classNames.bind(styles);
function PostCount({ reactOfPost }) {
  const handleReact = (arr) => {
    const newArr = [];
    arr.forEach(item => {
        const index = newArr.findIndex(item1 => item1.react === item.react)
        if(index === -1){
            newArr.push(item)
        }
    })
    return newArr
  };
  handleReact(reactOfPost)

  return (
    <div className={cx("post_infos")}>
      <div className={cx("react_count")}>
        <div className={cx("react_count-img")}>
          {handleReact(reactOfPost).slice(0, 3).map((item, index) => (
            <img
              src={`../../../reacts/${item.react}.svg`}
              key={index}
              style={{ zIndex: `${3 - index}` }}
              className={cx("react_count-svg")}
            />
          ))}
        </div>
        {reactOfPost.length > 0 && (
          <div className={cx("react_count-num")}>{reactOfPost.length}</div>
        )}
      </div>
      <div className={cx("comment_count")}>4 bình luận</div>
      <div className={cx("share_count")}>0 lượt chia sẻ</div>
    </div>
  );
}

export default PostCount;
