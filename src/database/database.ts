import sqlite3 from "sqlite3";
import { open } from "sqlite";

const initializeDb = async () => {
	const db = await open({
		filename: "./data/todos2.db",
		driver: sqlite3.Database,
	});

	await db.exec(`
        CREATE TABLE IF NOT EXISTS todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            complete_status BOOLEAN NOT NULL,
            finished_at TEXT NOT NULL,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        )
    `);

	return db;
};

export default initializeDb;
