import request from "supertest";
import app from "../app";
import { Todo } from "../models/todo";

describe("TodoController", () => {
	let todoId: number;
	let todo: Todo;

	it("should create a new todo", async () => {
		const todoData = {
			title: "Test Todo",
			description: "Test Description",
		};
		const response = await request(app)
			.post("/todo")
			.send(todoData)
			.expect(201);
		expect(response.body.data).toHaveProperty("id");
		expect(response.body.data.title).toBe(todoData.title);
		expect(response.body.data.description).toBe(todoData.description);
		todoId = response.body.data.id;
		todo = response.body.data;
	});

	it("should get all todos", async () => {
		const response = await request(app).get("/todo").expect(200);
		expect(response.body.data.length).toBeGreaterThan(0);
		expect(response.status).toBe(200);
		expect(Array.isArray(response.body.data)).toBe(true);
	});

	it("should get todo detail", async () => {
		const response = await request(app)
			.get(`/todo/${todoId}`)
			.expect(200);
		expect(response.body.data).toHaveProperty("id");
		expect(response.body.data.id).toBe(todoId);
		expect(response.status).toBe(200);
		expect(response.body.data).toEqual(todo);
	});

	it("should update todo", async () => {
		const response = await request(app)
			.put(`/todo/${todoId}`)
			.send({ title: "Updated Todo" })
			.expect(200);
		expect(response.body.data).toHaveProperty("id");
		expect(response.body.data.title).toBe("Updated Todo");
		expect(response.status).toBe(200);
	});

	it("should delete todo", async () => {
		const response = await request(app)
			.delete(`/todo/${todoId}`)
			.expect(200);
		expect(response.body.message).toBe("Todo deleted");

		const getResponse = await request(app)
			.get(`/todo/getDetail/${todoId}`)
			.expect(404);
		expect(getResponse.body.message).toBe("Todo not found");
	});
});
