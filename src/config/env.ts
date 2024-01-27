import "dotenv/config";

export const config = {
	PORT: Number(process.env.PORT) || 4040,
	DB_URL:
		process.env.DB_URL || "postgres://postgres:1407@localhost/atlas_report",
	CONSTANTS_FILE_DIR: String(process.env.CONSTANTS_FILE_DIR) || "constants",
	DB_READ_LIMIT: Number(process.env.DB_READ_LIMIT) || 50,
};
