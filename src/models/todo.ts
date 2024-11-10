export class Todo {
    public id: number;
    public title: string;
    public description: string;
    public complete_status: boolean;
    public created_at: Date;
    public updated_at: Date;

    constructor({
        id,
        title,
        description,
        complete_status,
        created_at,
        updated_at
    }: {
        id: number;
        title: string;
        description: string;
        complete_status: boolean;
        created_at: Date;
        updated_at: Date;
    }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.complete_status = complete_status;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}