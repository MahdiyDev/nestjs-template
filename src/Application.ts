import { Logger, ValidationPipe } from "@nestjs/common";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as bodyParser from "body-parser";
import { WinstonModule } from "nest-winston";
import * as winston from "winston";

import { CustomValidationError } from "common/errors/valitationError";
import { config } from "config/env";
import { AllExceptionsFilter } from "libs/errorHandler";

import { AppModule } from "./app.module";
import { transports } from "./libs/logService";

export default class ApplicationModule {
	public static async main(): Promise<void> {
		const logger = new Logger("main");

		const app = await NestFactory.create(AppModule);

		app.enableCors({
			origin: "*",
		});

		app.setGlobalPrefix("api/v1");

		app.useGlobalPipes(
			new ValidationPipe({
				transform: true,
				whitelist: true,
				forbidNonWhitelisted: true,
				exceptionFactory: (errors) => {
					return new CustomValidationError(errors);
				},
			}),
		);

		app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));

		const options = new DocumentBuilder()
			.setTitle("Arenda system")
			.setDescription("to get json: /api-swagger-json")
			.setVersion("0.0.1")
			.addBearerAuth(
				{
					description:
						"[just text field] Please enter token in following format: Bearer <JWT>",
					name: "Authorization",
					bearerFormat: "Bearer",
					scheme: "Bearer",
					type: "http",
					in: "Header",
				},
				"access-token",
			)
			.build();

		const document = SwaggerModule.createDocument(app, options);
		SwaggerModule.setup("api-swagger", app, document, {
			swaggerOptions: {
				// persistAuthorization: true,
			},
		});

		app.use(bodyParser.json({ limit: "20mb" }));
		app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));

		app.useLogger(
			WinstonModule.createLogger({
				format: winston.format.combine(
					winston.format.timestamp({
						format: "YYYY-MM-DD HH:mm:ss",
					}),
					winston.format.errors({ stack: true }),
					winston.format.splat(),
					winston.format.json(),
				),
				transports: [
					transports.console,
					transports.combinedFile,
					transports.errorFile,
					transports.fatalFile,
				],
			}),
		);

		const port = config.PORT;

		await app.listen(port, () => {
			logger.log(`Server url: http://localhost:${port}`);
			logger.log(
				`Server swagger url: http://localhost:${port}/api-swagger`,
			);
		});
	}
}
