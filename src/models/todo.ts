export class Todo {
	public id: number;
	public title: string;
	public description: string;
	public complete_status: boolean;
	public finished_at: Date;
	public created_at: Date;
	public updated_at: Date;

	constructor({
		id,
		title,
		description,
		complete_status,
		finished_at,
		created_at,
		updated_at,
	}: {
		id: number;
		title: string;
		description: string;
		complete_status: boolean;
		finished_at: Date;
		created_at: Date;
		updated_at: Date;
	}) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.complete_status = complete_status;
		this.finished_at = finished_at;
		this.created_at = created_at;
		this.updated_at = updated_at;
	}
}
