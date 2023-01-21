import { useDispatch } from "react-redux";
import images from "../assets/images";
export const menuList = [
  {
    heading: "Xã hội",
    list: [
      {
        icon: images.events,
        name: "Sự kiện",
        description:
          "Tổ chức hoặc tìm sự kiện cùng những hoạt động khác trên mạng và ở quanh đây.",
      },
      {
        icon: images.friends,
        name: "Bạn bè",
        description: "Tìm kiếm bạn bè hoặc những người bạn có thể biết.",
      },
      {
        icon: images.groups,
        name: "Nhóm",
        description:
          "Xem bài viết phù hợp của những người và Trang bạn theo dõi.",
      },
      {
        icon: images.feed,
        name: "Bảng tin",
        description:
          "Xem bài viết phù hợp của những người và Trang bạn theo dõi.",
      },
      {
        icon: images.fav,
        name: "Yêu thích",
        description: "View posts by Favorites.",
      },
      {
        icon: images.memories,
        name: "Gần đây nhất",
        description:
          "Xem bài viết gần đây nhất từ bạn bè, nhóm, Trang và hơn thế nữa.",
      },
      {
        icon: images.pages,
        name: "Trang",
        description: "Khám phá và kết nối với các doanh nghiệp trên Facebook.",
      },
    ],
  },
  {
    heading: "Giải trí",
    list: [
      {
        icon: images.gaming,
        name: "Video chơi game",
        description:
          "Xem, kết nối với những game và người phát trực tiếp mà bạn yêu thích.",
      },
      {
        icon: images.play,
        name: "Chơi game",
        description: "Chơi game bạn yêu thích.",
      },
      {
        icon: images.watch,
        name: "Watch",
        description:
          "Đích đến của video phù hợp với sở thích và quan hệ kết nối của bạn.",
      },
      {
        icon: images.live,
        name: "Video trực tiếp",
        description: "Xem video trực tiếp phổ biến từ khắp thế giới",
      },
    ],
  },
  {
    heading: "Mua sắm",
    list: [
      {
        icon: images.pay,
        name: "Đơn đặt hàng và thanh toán",
        description:
          "Một cách dễ dàng, bảo mật để thanh toán trên các ứng dụng bạn đang dùng.",
      },
      {
        icon: images.marketplace,
        name: "Marketplace",
        description: "Mua bán trong cộng đồng của bạn.",
      },
    ],
  },
  {
    heading: "Cá nhân",
    list: [
      {
        icon: images.recent,
        name: "Hoạt động quảng cáo gần nhất",
        description: "Xem toàn bộ quảng cáo mà bạn đã tương tác trên Facebook.",
      },
      {
        icon: images.memories,
        name: "Kỉ niệm",
        description:
          "Lướt xem ảnh, video và bài viết cũ của bạn trên Facebook.",
      },
      {
        icon: images.saved,
        name: "Đã lưu",
        description: "Tìm bài viết, ảnh và video mà bạn đã lưu để xem sau.",
      },
    ],
  },
  {
    heading: "Chuyên nghiệp",
    list: [
      {
        icon: images.ads,
        name: "Trình quản lí quảng cáo",
        description: "Tạo, quản lý và theo dõi hiệu quả quảng cáo.",
      },
      {
        icon: images.ad,
        name: "Trung tâm quảng cáo",
        description:
          "Dùng các tính năng đơn giản hơn để quản lý mọi quảng cáo bạn tạo trên Trang.",
      },
    ],
  },
  {
    heading: "Nguồn lực cho cộng đồng",
    list: [
      {
        icon: images.climate,
        name: "Trung tâm khoa học khí hậu",
        description:
          "Tìm hiểu về vấn đề biến đổi khí hậu và tác động của hiện tượng này.",
      },
      {
        icon: images.fund,
        name: "Chiến dịch gây quỹ",
        description:
          "Quyên góp và gây quỹ cho tổ chức phi lợi nhuận và mục đích cá nhân.",
      },
      {
        icon: images.emotional,
        name: "Sức khỏe cảm xúc",
        description: "",
      },
    ],
  },
];

export const create = [
  {
    name: "Đăng",
    icon: "m_post_icon",
  },
  {
    name: "Tin",
    icon: "m_story_icon",
  },
  {
    name: "Phòng họp mặt",
    icon: "m_room_icon",
  },
  {
    divider: true,
  },
  {
    name: "Trang",
    icon: "m_page_icon",
  },
  {
    name: "Quảng cáo",
    icon: "m_ad_icon",
  },
  {
    name: "Nhóm",
    icon: "m_group_icon",
  },
  {
    name: "Sự kiện",
    icon: "m_event_icon",
  },
  {
    name: "Bài niêm yết trên Marketplace",
    icon: "m_post_mar",
  },
];

export const userMenu = [
  {
    name: "Cài đặt & quyền riêng tư",
    icon: "settings_filled_icon",
    children: {
      title: "Cài đặt & quyền riêng tư",
      data: [
        {
          name: "Cài đặt",
          icon: "settings_filled_icon",
        },
        {
          name: "Kiểm tra quyền riêng tư",
          icon: "privacy_checkup_icon",
        },
        {
          name: "Trung tâm quyền riêng tư",
          icon: "privacy_shortcuts_icon",
        },
        {
          name: "Nhật ký hoạt động",
          icon: "activity_log_icon",
        },
        {
          name: "Tùy chọn Bảng feed",
          icon: "news_icon",
        },
        {
          name: "Ngôn ngữ",
          icon: "language_icon",
        },
      ],
    },
  },
  {
    name: "Trợ giúp & hỗ trợ",
    icon: "help_filled_icon",
    children: {
      title: "Trợ giúp & hỗ trợ",
      data: [
        {
          name: "Trung tâm trợ giúp",
          icon: "help_filled_icon",
        },
        {
          name: "Hỗ trợ hộp thư",
          icon: "email_icon",
        },
        {
          name: "Báo cáo sự cố",
          icon: "info_filled_icon",
        },
      ],
    },
  },
  {
    name: "Màn hình & trợ năng",
    icon: "dark_filled_icon",
    children: {
      title: "Màn hình & trợ năng",
      data: [
        {
          name: "Chế độ tối",
          icon: "dark_filled_icon",
          children: {
            title: "Chế độ tối",
            data: [
              {
                name: "Tắt",
                theme: "default",
              },
              {
                name: "Bật",
                theme: "dark",
              },
            ],
          },
        },
        {
          name: "Chế độ Thu gọn",
          icon: "info_filled_icon",
          children: {
            title: "Chế độ Thu gọn",
            data: [
              {
                name: "Tắt",
              },
              {
                name: "Bật",
              },
            ],
          },
        },
        {
          name: "Bàn phím",
          icon: "keyboard_icon",
        },
      ],
    },
  },
  {
    name: "Đóng góp ý kiến",
    icon: "report_filled_icon",
  },
];
