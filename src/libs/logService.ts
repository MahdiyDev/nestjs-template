import * as winston from "winston";
import * as winstonDailyRotateFile from "winston-daily-rotate-file";

import { OperationConditionEnum } from "./operations";
import { IPrompts } from "./prompt";

export interface IInfo {
	context: string;
	proccess_id: string;
	service_id: string;
	parent_service_id: string;
	service_name: string;
	action: OperationConditionEnum;
	meta: {
		prompt: IPrompts;
		request_body: object;
		error_massage: null;
		stack_trace: null;
	};
	level: string;
	message: undefined;
	timestamp: string;
}

export const transports = {
	console: new winston.transports.Console({
		level: "silly",
		format: winston.format.combine(
			winston.format.timestamp({
				format: "YYYY-MM-DD HH:mm:ss",
			}),
			winston.format.colorize({
				colors: {
					info: "blue",
					debug: "yellow",
					error: "red",
				},
			}),
			winston.format.printf((info: IInfo) => {
				return `${info.timestamp} [${info.level}] [${
					info.service_name ? info.service_name : info.context
				}] [${
					info.action ? info.action : OperationConditionEnum.INFO
				}] ${
					info.message
						? (info.message as string)
						: info.meta.error_massage
						? info.meta.error_massage
						: "DEFAULT_MESSAGE"
				}`;
			}),
		),
	}),
	combinedFile: new winstonDailyRotateFile({
		dirname: "logs",
		filename: "combined",
		extension: ".log",
		level: "info",
	}) as winstonDailyRotateFile,
	errorFile: new winstonDailyRotateFile({
		dirname: "logs",
		filename: "error",
		extension: ".log",
		level: "error",
	}) as winstonDailyRotateFile,
	fatalFile: new winstonDailyRotateFile({
		dirname: "logs",
		filename: "fatal",
		extension: ".log",
		level: "fatal",
	}) as winstonDailyRotateFile,
};
