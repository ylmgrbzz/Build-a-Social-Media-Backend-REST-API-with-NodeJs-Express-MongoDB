
import express from "express";
import mongoose from "mongoose";
import router from "./routes/User";
import blogRouter from "./routes/Blog";

const app = express();
app.use(express.json());
app.use("/api/users", router);
app.use("/api/blogs", blogRouter);

mongoose
  .connect("mongodb://localhost/myDatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
