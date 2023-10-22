import express from "express";
import { getUserById, getUsers, login, signup } from "../controllers/User";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);

router.post("/signup", signup);
router.post("/login", login);

export default router;
