import { Database, Statement } from "sqlite3";
import { Database as db } from "sqlite";
import { Todo } from "../models/todo";

export class TodoRepository {
	constructor(private readonly dbPromise: Promise<db<Database, Statement>>) {}

	async create(
		data: Omit<Todo, "id" | "complete_status" | "created_at" | "updated_at">,
	): Promise<void> {
		const db = await this.dbPromise;
		await db.run(
			`INSERT INTO todos (title, description, complete_status, finished_at, created_at, updated_at)
                VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
			[data.title, data.description, false, data.finished_at],
		);
	}

	async getAll(): Promise<Todo[]> {
		const db = await this.dbPromise;
		const todos = await db.all(`SELECT * FROM todos`);
		return todos;
	}

	async getDetail(id: number): Promise<Todo> {
		const db = await this.dbPromise;
		const todo = await db.get(`SELECT * FROM todos WHERE id = ?`, id);
		return todo;
	}

	async update(
		id: number,
		data: Partial<Omit<Todo, "id" | "updated_at">>,
	): Promise<void> {
		const db = await this.dbPromise;
		await db.run(
			`UPDATE todos 
             SET title = COALESCE(?, title), 
                 description = COALESCE(?, description),
                 finished_at = COALESCE(?, finished_at), 
                 updated_at = CURRENT_TIMESTAMP 
             WHERE id = ?`,
			data.title,
			data.description,
			data.finished_at,
			id,
		);
	}

	async delete(id: number): Promise<boolean> {
		const db = await this.dbPromise;
		const result = await db.run(`DELETE FROM todos WHERE id = ?`, id);

		return (result.changes ?? 0) > 0;
	}
}
