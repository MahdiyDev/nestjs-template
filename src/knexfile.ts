import { Knex } from "knex";

import { knexOptions } from "./config/knex";

const config: { [key: string]: Knex.Config } = {
	development: {
		...knexOptions.config,
	},

	staging: {
		...knexOptions.config,
		migrations: {
			tableName: "knex_migrations",
		},
	},

	production: {
		...knexOptions.config,
	},
};

module.exports = config;
