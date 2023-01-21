import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { stories } from "../../data/home";
import { ArrowRight, Plus } from "../../svg";
import styles from "./Story.module.scss";
import StoryItem from "./StoryItem";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

const cx = classNames.bind(styles);

function Story() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("story-container")}>
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
          <span className={cx("right-btn")}>
            <ArrowRight />
          </span>
        </div>
        <Swiper
          slidesPerView={2.8}
          spaceBetween={10}
          breakpoints={{
            360: {
              slidesPerView: 2.8,
            },
            390: {
              slidesPerView: 3,
            },
            430: {
              slidesPerView: 3.5,
            },
            520: {
              slidesPerView: 4.2,
            },
            600: {
              slidesPerView: 4.4,
            },
          }}
          className={cx("story-mobile")}
        >
          <SwiperSlide>
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
          </SwiperSlide>
          {stories.map((story, index) => (
            <SwiperSlide key={index}>
              <StoryItem
                name={story.profile_name}
                image={story.image}
                picture={story.profile_picture}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Story;
