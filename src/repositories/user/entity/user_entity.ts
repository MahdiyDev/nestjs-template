import { BaseEntity } from "common/database/base.entity";
import { UserType } from "common/enums/user_type_enum";

export class UserEntity extends BaseEntity {
	username: string;
	password: string;
	type: UserType;
}
