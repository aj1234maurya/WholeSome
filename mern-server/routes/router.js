import express from "express";
const router = express.Router();
import {
  addingManga,
  viewingManga,
  editingManga,
  deletingManga,
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controller/controller.js";
import protect from "../middleware/authMiddleware.js";

router.post("/", authUser);

router.post("/register", registerUser);

router.post("/logout", logoutUser);

router.get("/profile", protect, getUserProfile);

router.put("/profile", protect, updateUserProfile);

router.post("/addmanga", protect, addingManga);

router.get("/viewlist", protect, viewingManga);

router.put("/edit/:id", protect, editingManga);

router.delete("/delete/:id", protect, deletingManga);

export default router;
