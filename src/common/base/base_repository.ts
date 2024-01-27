import { Knex } from "knex";

import { TableNames } from "common/database/table_names";
import { config } from "config/env";

import { BaseEntity } from "../database/base.entity";

export class BaseRepository<TEntity extends BaseEntity> {
	constructor(
		protected readonly knex: Knex,
		private readonly tableName: TableNames,
	) {}

	async readAll(data: TEntity[], withoutLimit = false) {
		let readData = this.knex<TEntity>(this.tableName)
			.select()
			.whereRaw("is_active is true");
		if (!withoutLimit) {
			readData = readData.limit(config.DB_READ_LIMIT);
		}
		data = (await readData) as TEntity[];
		return data;
	}

	async readOneByKey<T extends keyof TEntity>(
		key: T,
		value: TEntity[typeof key],
	) {
		return (await this.knex(this.tableName)
			.select()
			.where(key, value)
			.andWhereRaw("is_active is true")
			.limit(config.DB_READ_LIMIT)) as TEntity[];
	}

	async readOneByKeyWithTransaction<
		T extends keyof TEntity,
		K extends keyof TEntity,
	>(
		trx: Knex.Transaction,
		key: T,
		value: TEntity[typeof key],
		select: "*" | K[] = "*",
	): Promise<Pick<TEntity, K>[]> {
		return (await trx(this.tableName)
			.select(select)
			.where(key, value)
			.andWhereRaw("is_active is true")
			.limit(config.DB_READ_LIMIT)) as Pick<TEntity, K>[];
	}

	async create<T = TEntity | TEntity[]>(entity: T) {
		return (await this.knex(this.tableName)
			.insert(entity)
			.returning("*")) as TEntity[];
	}

	async createWithTransaction<T = TEntity | TEntity[]>(
		trx: Knex.Transaction,
		entity: T,
	) {
		return (await trx(this.tableName)
			.insert(entity)
			.returning("*")) as TEntity[];
	}

	async update(entity: TEntity) {
		return (await this.knex(this.tableName)
			.update(entity)
			.where("id", entity.id)
			.returning("*")) as unknown as TEntity[];
	}

	async updateWithTransaction(trx: Knex.Transaction, entity: TEntity) {
		return (await trx(this.tableName)
			.update(entity)
			.where("id", entity.id)
			.returning("*")) as TEntity[];
	}

	async delete(id: number) {
		return (await this.knex<TEntity>(this.tableName)
			.delete()
			.where("id", id)
			.returning("*")) as TEntity[];
	}

	async deleteWithTransaction(trx: Knex.Transaction, id: number) {
		return (await trx(this.tableName)
			.delete()
			.where("id", id)
			.returning("*")) as TEntity[];
	}
}
