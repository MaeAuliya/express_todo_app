import { Todo } from "../models/todo";
import { TodoRepository } from "../repositories/todo_repository";

export class TodoService {
	constructor(private readonly repository: TodoRepository) {}

	async create(
		data: Omit<Todo, "id" | "complete_status" | "created_at" | "updated_at">,
	): Promise<void> {
		try {
			await this.repository.create(data);
		} catch (error) {
			console.error("Error creating todo", error);
			throw new Error("Error creating todo");
		}
	}

	async getAll(): Promise<Todo[]> {
		try {
			const result = await this.repository.getAll();
			return result;
		} catch (error) {
			console.error("Error getting all todos", error);
			throw new Error("Error getting all todos");
		}
	}

	async getDetail(id: number): Promise<Todo> {
		try {
			const result = await this.repository.getDetail(id);
			return result;
		} catch (error) {
			console.error("Error getting detail todo", error);
			throw new Error("Error getting detail todo");
		}
	}

	async update(
		id: number,
		data: Partial<Omit<Todo, "id" | "updated_at">>,
	): Promise<void> {
		try {
			await this.repository.update(id, data);
		} catch (error) {
			console.error("Error updating todo", error);
			throw new Error("Error updating todo");
		}
	}

	async delete(id: number): Promise<boolean> {
		try {
			return this.repository.delete(id);
		} catch (error) {
			console.error("Error deleting todo", error);
			throw new Error("Error deleting todo");
		}
	}
}
