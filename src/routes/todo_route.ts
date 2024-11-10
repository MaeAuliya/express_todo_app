import { Router } from "express";
import TodoController from "../controllers/todo_controller";

const router = Router();

router.get("/getAll", TodoController.getAll);
router.get("/getDetail/:id", TodoController.getDetail);
router.post("/create", TodoController.create);
router.put("/update/:id", TodoController.update);
router.delete("/delete/:id", TodoController.delete);

export default router;