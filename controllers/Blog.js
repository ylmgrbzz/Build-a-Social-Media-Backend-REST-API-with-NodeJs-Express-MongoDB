import Blog from "../model/Blog";

export const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find();
    if (blogs == null) {
      return res.status(404).json({ message: "Cannot find blog" });
    }
    return res.status(200).json({ blogs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addBlog = async (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    image: req.body.image,
  });

  let existingUser;
  try {
    existingUser = await User.findById(req.body.author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  if (!existingUser) {
    return res.status(400).json({ message: "User does not exist" });
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session: session });
    const newBlog = await blog.save();
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session: session });
    await session.commitTransaction();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateBlog = async (req, res, next) => {
  const { title, content, image } = req.body;
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      content,
      image,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  return res.status(200).json({ blog });
};

export const getById = async (req, res, next) => {
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(blogId).populate("author");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  return res.status(200).json({ blog });
};

export const deleteBlog = async (req, res, next) => {
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndDelete(blogId).populate("author");
    await blog.author.blogs.pull(blog);
    await blog.author.save();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  return res.status(200).json({ blog });
};
