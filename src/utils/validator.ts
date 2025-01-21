import { z } from "zod";

export class TodoValidator {
	public static todoSchema = z.object({
		title: z.string().min(1, "Title is required"),
		description: z.string().min(1, "Description is required"),
		finished_at: z.coerce.date(),
	});

	public static idSchema = z.number({
        invalid_type_error: "ID must be a number",
    });
}
