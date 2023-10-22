
import express from "express";
import mongoose from "mongoose";
import router from "./routes/User";

const app = express();
app.use(express.json());
app.use("/api/users", router);

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
