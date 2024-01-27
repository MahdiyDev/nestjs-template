import { Knex } from "knex";
import { InjectConnection } from "nest-knexjs";

import { BaseRepository } from "common/base/base_repository";
import { TableNames } from "common/database/table_names";

import { UserEntity } from "./entity/user_entity";

export class UserRepository extends BaseRepository<UserEntity> {
	constructor(@InjectConnection() knex: Knex<UserEntity, UserEntity[]>) {
		super(knex, TableNames.REF_USER);
	}

	async readOneByUsernameAndPassword(userEntity: UserEntity) {
		return await this.knex<UserEntity>(TableNames.REF_USER)
			.select()
			.where("username", userEntity.username)
			.andWhere("password", userEntity.password);
	}
}
