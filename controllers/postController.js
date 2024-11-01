const postModel = require("../models/postModel");

const createPostController = async (req, res) => {
  try {
    const { title, description } = req.body;

    //validation
    if (!title || !description) {
      res.status(500).send({
        success: false,
        message: "Please provide title or description",
      });
    }

    const post = await postModel({
      title,
      description,
      postedBy: req.auth._id,
    }).save();

    res.status(201).send({
      success: true,
      message: "Post successfully created",
      post,
    });
    console.log(req);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in create post api",
      error,
    });
  }
};

const enlistPostsController = async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .populate("postedBy", "_id name")
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error getting user posts",
      error,
    });
  }
};

const userPostsController = async (req, res) => {
  try {
    const userPosts = await postModel.find({ postedBy: req.auth._id });
    return res.status(200).send({
      success: true,
      message: "Users posts list successfully loaded",
      userPosts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error loading user posts",
      error,
    });
  }
};

const userPostDeleteController = async (req, res) => {
  try {
    const { id } = req.params;
    await postModel.findByIdAndDelete({ _id: id });

    return res.status(200).send({
      success: true,
      message: "Successfully deleted user post",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "failed deleting user post",
      error,
    });
  }
};

const userPostUpdateController = async (req, res) => {
  try {
    const { title, description } = req.body;

    const post = await postModel.findById({ _id: req.params.id });

    //validation
    if (!title || !description) {
      return res.status(500).send({
        success: false,
        message: "Please provide post title and description",
      });
    }
    const updatedPost = await postModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        title: title || post?.title,
        description: description || post?.description,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "User post updated successfully",
      updatedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Unable to update, user post",
      error,
    });
  }
};

module.exports = {
  createPostController,
  enlistPostsController,
  userPostsController,
  userPostDeleteController,
  userPostUpdateController,
};
