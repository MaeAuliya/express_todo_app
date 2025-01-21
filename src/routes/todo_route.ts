import { Router } from "express";
import { TodoController } from "../controllers/todo_controller";

export class TodoRouter {
	public router: Router;

	constructor(
		private controller: TodoController,
		router: Router,
	) {
		this.router = router;
		this.initRoute();
	}

	private initRoute() {
		this.router.get("/todo", this.controller.getAll);
		this.router.get("/todo/:id", this.controller.getDetail);
		this.router.post("/todo", this.controller.create);
		this.router.put("/todo/:id", this.controller.update);
		this.router.delete("/todo/:id", this.controller.delete);
	}
}
