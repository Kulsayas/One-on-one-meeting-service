import { Router } from "express";
import {
  getBooks,
  createBook,
  editTimeSlot,
  deleteBook,
} from "../controller/book.controller.js";

const router = Router();

router.get("/", getBooks);
router.post("/", createBook);
router.post("/:meeting_id", editTimeSlot);
router.delete("/:meeting_id", deleteBook);
export default router;
