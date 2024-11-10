import TodoService from "../services/todo_service";
import { Todo } from "../models/todo";

describe('TodoService', () => {
    let createdTodo: Todo;

    it('should create a new todo', async () => {
        const todoData = {
            title: 'Test Todo',
            description: 'Test Description',
        };
        createdTodo = await TodoService.create(todoData);
        expect(createdTodo).toHaveProperty('id');
        expect(createdTodo.title).toBe(todoData.title);
        expect(createdTodo.description).toBe(todoData.description);
    });

    it('should get all todos', async () => {
        const todosData = [createdTodo, createdTodo, createdTodo];
        const todos = await TodoService.getAll();
        expect(todos.length).toBeGreaterThan(0);
        expect(todos).toEqual(expect.arrayContaining(todosData));
    });

    it('should get todo detail', async () => {
        const todo = await TodoService.getDetail(createdTodo.id);
        expect(todo).toEqual(createdTodo);
        expect(todo).not.toBeNull();
        expect(todo.id).toBe(createdTodo.id);
    });

    it('should update todo', async () => {
        const updatedTodo = await TodoService.update(createdTodo.id, { title: 'Updated Todo' });
        expect(updatedTodo).toHaveProperty('id');
        expect(updatedTodo.title).toBe('Updated Todo');
        expect(updatedTodo).not.toBeNull();
    });

    it('should delete todo', async () => {
        const result = await TodoService.delete(createdTodo.id);
        expect(result).toBe(true);

        const todo = await TodoService.getDetail(createdTodo.id);
        expect(todo).toBeUndefined();
    });
});