import "dotenv/config";

export default {
	dbUrl: createDatabaseUrl(),
	logLevel: process.env.LOG_LEVEL ?? "info",
	port: parseInt(process.env.PORT ?? "3000", 10),
	production: process.env.NODE_ENV === "production",
};

function createDatabaseUrl() {
	if (process.env.DATABASE_URL) {
		return process.env.DATABASE_URL;
	}
	const host = process.env.DB_HOST ?? "dpg-cqlttulds78s73acbki0-a";
	const name = process.env.DB_NAME ?? "cyf_39kh_0tiq";
	const password = process.env.DB_PASS ?? process.env.DB_PASSWORD ?? "kJHZgijUm4bzleteAfGNMBy2nKK8M1Rg";
	const port = process.env.DB_PORT ?? "5432";
	const username = process.env.DB_USER ?? process.env.DB_USERNAME ?? "cyf_39kh_0tiq_user";
	return `postgresql://${username}:${password}@${host}:${port}/${name}`;
}
