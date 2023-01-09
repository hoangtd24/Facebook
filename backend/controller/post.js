const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    const post = await new Post(req.body).save();
    res.status(200).json({
      post: post,
      message: "Tạo bài viết thành công",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllPost = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate("user")
      .populate("comments.commentBy", "username picture")
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.comment = async (req, res) => {
  try {
    const { postId, text, image } = req.body;
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: {
          comments: {
            comment: text,
            image: image,
            commentBy: req.user.id,
            commentAt: new Date(),
          },
        },
      },
      { new: true }
    ).populate("comments.commentBy");
    console.log(post.comments);
    res.status(200).json(post.comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
