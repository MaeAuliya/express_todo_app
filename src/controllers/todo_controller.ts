import { Request, Response } from "express";
import { TodoService } from "../services/todo_service";
import { ZodError } from "zod";
import { TodoValidator } from "../utils/validator";

export class TodoController {
	constructor(private readonly service: TodoService) {}

	public create = async (req: Request, res: Response): Promise<void> => {
		try {
			const validateData = TodoValidator.todoSchema.parse(req.body);
			const result = await this.service.create(validateData);
			res.status(201).json({ message: "Todo created", data: result });
		} catch (error) {
			if (error instanceof ZodError) {
				res
					.status(400)
					.json({ message: "Validation failed", error: error.errors });
			} else {
				console.error("Error creating todo:", error);
				res.status(500).json({ message: "Internal server error" });
			}
		}
	};

	public getAll = async (req: Request, res: Response): Promise<void> => {
		try {
			const todos = await this.service.getAll();
			res.status(200).json({ message: "Success", data: todos });
		} catch (error) {
			console.error("Error getting todos:", error);
			res.status(500).json({ message: "Internal server error" });
		}
	};

	public getDetail = async (req: Request, res: Response): Promise<void> => {
		try {
			const validate = TodoValidator.idSchema.parse(Number(req.params.id));

			const result = await this.service.getDetail(validate);

			res.status(200).json({ message: "Success", data: result });
		} catch (error) {
			if (error instanceof ZodError) {
				res
					.status(400)
					.json({ message: "Validation failed", error: error.errors[0].message });
			} else {
				console.error("Error fetching detail todo:", error);
				res.status(500).json({ message: "Internal server error" });
			}
		}
	};

	public update = async (req: Request, res: Response): Promise<void> => {
		try {
			const validateData = TodoValidator.todoSchema.parse(req.body);
			const validateId = TodoValidator.idSchema.parse(Number(req.params.id));

			const result = await this.service.update(validateId, validateData);

			res.status(201).json({ message: "Todo updated", data: result });
		} catch (error) {
			if (error instanceof ZodError) {
				res
					.status(400)
					.json({ message: "Validation failed", error: error.errors });
			} else {
				console.error("Error updating todo:", error);
				res.status(500).json({ message: "Internal server error" });
			}
		}
	};

	public delete = async (req: Request, res: Response): Promise<void> => {
		try {
			const validateId = TodoValidator.idSchema.parse(Number(req.params.id));
			const result = await this.service.delete(validateId);

			if(result){
				res.status(200).json({ message: "Todo deleted" });
			} else {
				res.status(404).json({ message: "Todo not found" });
			}

		} catch (error) {
			if (error instanceof ZodError) {
				res
					.status(400)
					.json({ message: "Validation failed", error: error.errors });
			} else {
				console.error("Error deleting todo:", error);
				res.status(500).json({ message: "Internal server error" });
			}
		}
	};
}
