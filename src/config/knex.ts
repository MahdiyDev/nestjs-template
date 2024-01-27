import { KnexModuleOptions } from "nest-knexjs";

import { config } from "./env";

export const knexOptions: KnexModuleOptions = {
	config: {
		client: "postgresql",
		connection: config.DB_URL,
		// pool: {
		// 	min: 2,
		// 	max: 10,
		// },
	},
};
