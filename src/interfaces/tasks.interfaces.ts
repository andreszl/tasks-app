export interface ITask {
	_id: string,
	email: string,
	title: string,
	description: string,
	created_at : Date,
	updated_at : Date,
}

export interface ICreate {
	description: string,
	email: string,
}
