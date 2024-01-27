export class BaseEntity {
	id: number;
	ext_id: string;
	sequence_id: number;
	// is_deleted: boolean;
	is_active: boolean;
	created_at: Date;
	last_edited_at: Date;
	deleted_at: Date;
}
