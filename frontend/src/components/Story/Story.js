import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { stories } from "../../data/home";
import { ArrowRight, Plus } from "../../svg";
import styles from "./Story.module.scss";
import StoryItem from "./StoryItem";

const cx = classNames.bind(styles);

function Story() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("story-wrap")}>
        <div className={cx("create-story")}>
          <div
            className={cx("create-story__img")}
            style={{ backgroundImage: `url(${user.picture})` }}
          ></div>
          <div className={cx("create-action")}>
            <span className={cx("circle-icon_wrap")}>
              <span className={cx("circle-icon")}>
                <Plus color="#fff" />
              </span>
            </span>
            <span className={cx("create-story_title")}>Tạo tin</span>
          </div>
        </div>
        {stories.map((story, index) => (
          <StoryItem
            name={story.profile_name}
            image={story.image}
            picture={story.profile_picture}
            key={index}
          />
        ))}
      </div>
      <span className={cx("right-btn")}>
        <ArrowRight color="#65676b" />
      </span>
    </div>
  );
}

export default Story;
