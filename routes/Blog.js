import express from "express";
const blogRouter = express.Router();
import { getAllBlogs, addBlog, updateBlog, getById, deleteBlog } from "../controllers/Blog";

blogRouter.get("/", getAllBlogs);

blogRouter.get("/user/:id",getById)

blogRouter.post("/", addBlog);

blogRouter.put("/update/:id", updateBlog);

blogRouter.delete("/delete/:id", deleteBlog);

export default blogRouter;
