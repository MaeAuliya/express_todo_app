import { Database, Statement } from "sqlite3";
import { Database as db } from "sqlite";
import { TodoService } from "./services/todo_service";
import { TodoRepository } from "./repositories/todo_repository";
import { TodoController } from "./controllers/todo_controller";
import initializeDb from "./database/database";
import { Router } from "express";
import { TodoRouter } from "./routes/todo_route";

class DIContainer {
	private static instance: DIContainer;
	public router = Router();

	public static async getInstance(): Promise<DIContainer> {
		if (!DIContainer.instance) {
			DIContainer.instance = new DIContainer();
			await DIContainer.instance.init();
		}
		return DIContainer.instance;
	}

	private async init() {
		await this.initTodo(initializeDb());
	}

	private async initTodo(dbPromise: Promise<db<Database, Statement>>) {
		const repository = new TodoRepository(dbPromise);
		const service = new TodoService(repository);
		const controller = new TodoController(service);
		new TodoRouter(controller, this.router);
	}

}

export default DIContainer;
