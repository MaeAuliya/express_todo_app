import { Request, Response } from "express";
import TodoService from "../services/todo_service";

class TodoController {
    public create = async (req: Request, res: Response): Promise<void> => {
        const { title, description} = req.body;

        if (typeof title !== 'string' || title === null) {
            res.status(400).json({
                message: "Invalid request data",
                error: "title must be a string",
            });
        } else if (typeof description !== 'string'|| description === null) {
            res.status(400).json({
                message: "Invalid request data",
                error: "description must be a string"
            });
        } else {
            const newTodo = await TodoService.create(req.body);
            res.status(201).json({ message: "Todo created", data: newTodo });
        }
    };

    public getAll = async (req: Request, res: Response): Promise<void> => {
        const todos = await TodoService.getAll();
        res.status(200).json({ message: "Success", data: todos });
    };

    public getDetail= async (req: Request, res: Response): Promise<void> => {
        const selectedTodo = await TodoService.getDetail(parseInt(req.params.id));
        if(selectedTodo) {
            res.status(200).json({ message: "Success", data: selectedTodo });
        } else {
            res.status(404).json({ message: "Todo not found" });
        }
    }

    public update = async (req: Request, res: Response): Promise<void> => {
        const updatedTodo = await TodoService.update(parseInt(req.params.id), req.body);
        if(updatedTodo) {
            res.status(200).json({ message: "Todo updated", data: updatedTodo });
        } else {
            res.status(404).json({ message: "Todo not found" });
        }
    }

    public delete = async (req: Request, res: Response): Promise<void> => {
        const deletedTodo = await TodoService.delete(parseInt(req.params.id));
        if(deletedTodo) {
            res.status(200).json({ message: "Todo deleted" });
        } else {
            res.status(404).json({ message: "Todo not found" });
        }
    }
}


export default new TodoController();
