import initializeDb from "../database/database";
import { Todo } from "../models/todo";

class TodoService {
    private dbPromise = initializeDb();

    public async create(data: Omit<Todo, 'id' | 'complete_status' | 'created_at' | 'updated_at' >): Promise<Todo> {
        const db = await this.dbPromise;
        const result = await db.run(
            `INSERT INTO todos (title, description, complete_status, created_at, updated_at)
            VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
            [data.title, data.description, false]
        );

        return this.getDetail(result.lastID ?? 0);
    }

    public async getAll(): Promise<Todo[]> {
        const db = await this.dbPromise;
        const todos = await db.all(`SELECT * FROM todos`);
        return todos;
    }

    public async getDetail(id: number): Promise<Todo> {
        const db = await this.dbPromise;
        const todo = await db.get(`SELECT * FROM todos WHERE id = ?`, id);
        return todo;
    }

    public async update(id: number, data: Partial<Omit<Todo, 'id' | 'updated_at'>>): Promise<Todo> {
        const db = await this.dbPromise;
        await db.run(
            `UPDATE todos 
             SET title = COALESCE(?, title), 
                 description = COALESCE(?, description), 
                 complete_status = COALESCE(?, complete_status), 
                 updated_at = CURRENT_TIMESTAMP 
             WHERE id = ?`,
            data.title, data.description, data.complete_status !== undefined ? (data.complete_status ? 1 : 0) : undefined, id
        );

        return this.getDetail(id);
    }

    public async delete(id: number): Promise<boolean> {
        const db = await this.dbPromise;
        const result = await db.run(`DELETE FROM todos WHERE id = ?`, id);
        return (result.changes ?? 0) > 0;
    }
}

export default new TodoService();