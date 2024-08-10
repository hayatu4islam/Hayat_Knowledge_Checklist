// import http from "http";
// import app from "./app";
// import { connectDb, disconnectDb } from "./db";
// import config from "./utils/config";
// import logger from "./utils/logger";

// const server = http.createServer(app);

// server.on("listening", () => {
// 	const addr = server.address();
// 	const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
// 	logger.info("listening on: %s", bind);
// });

// server.on("error", (error) => {
// 	if (error.syscall !== "listen") {
// 		throw error;
// 	}
// 	const bind =
// 		typeof config.port === "string"
// 			? `Pipe ${config.port}`
// 			: `Port ${config.port}`;

// 	switch (error.code) {
// 		case "EACCES":
// 			logger.error(`${bind} requires elevated privileges`);
// 			process.exit(1);
// 			break;
// 		case "EADDRINUSE":
// 			logger.error(`${bind} is already in use`);
// 			process.exit(1);
// 			break;
// 		default:
// 			throw error;
// 	}
// });

// process.on("SIGTERM", () => {
// 	logger.info("SIGTERM signal received: closing HTTP server");
// 	server.close((err) => {
// 		if (err) {
// 			logger.error("Error closing server:", err);
// 			process.exit(1);
// 		}
// 		disconnectDb().then(() => {
// 			logger.info("Disconnected from database");
// 			process.exit(0);
// 		});
// 	});
// });

// process.on("SIGINT", () => {
// 	logger.info("SIGINT signal received: closing HTTP server");
// 	server.close((err) => {
// 		if (err) {
// 			logger.error("Error closing server:", err);
// 			process.exit(1);
// 		}
// 		disconnectDb().then(() => {
// 			logger.info("Disconnected from database");
// 			process.exit(0);
// 		});
// 	});
// });

// connectDb()
// 	.then(() => server.listen(config.port))
// 	.catch((error) => {
// 		logger.error("Failed to connect to the database:", error);
// 		process.exit(1);
// 	});

import http from "http";

import app from "./app";
import { connectDb, disconnectDb } from "./db";
import config from "./utils/config";
import logger from "./utils/logger";

const server = http.createServer(app);

server.on("listening", () => {
	const addr = server.address();
	const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
	logger.info("listening on: %s", bind);
});

process.on("SIGTERM", () => server.close(() => disconnectDb()));

connectDb().then(() => server.listen(config.port));
