import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpStatus,
	Logger,
} from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import {
	TokenExpiredError as JWTTokenExpiredError,
	JsonWebTokenError,
} from "@nestjs/jwt";
import { DatabaseError } from "pg-protocol";

import { BaseDto, MetaDto, MetaPrompt } from "common/base/base_dto";
import { ResponseStatusType } from "common/enums/response_status_type_enum";
import { BaseError } from "common/errors/baseError";
import { CustomValidationError } from "common/errors/valitationError";
import { RequestWithPayload } from "common/interfaces/interface";
import { InvalidTokenError } from "services/auth/error/invalid_token_error";
import { TokenExpiredError } from "services/auth/error/token_expired_error";

import { OperationConditionEnum, OperationObject } from "./operations";
import { Prompts } from "./prompt";
import { ApplicationPromptID } from "./prompt/applicationPrompt";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	private readonly logger = new Logger(AllExceptionsFilter.name);

	constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

	catch(exception: unknown, host: ArgumentsHost): void {
		const { httpAdapter } = this.httpAdapterHost;

		const ctx = host.switchToHttp();

		const request = host
			.switchToHttp()
			.getRequest<Request>() as RequestWithPayload;

		const metaDataBody = request.body as unknown as BaseDto;

		const dto = metaDataBody ? metaDataBody : new BaseDto();
		dto.meta = dto.meta ? dto.meta : new MetaDto();
		dto.meta.type = ResponseStatusType.ERROR;
		dto.meta.params = metaDataBody?.meta?.params
			? metaDataBody.meta.params
			: {};
		dto.meta.prompt = dto.meta.prompt ? dto.meta.prompt : new MetaPrompt();
		const prompts = new Prompts();
		if (exception instanceof CustomValidationError) {
			prompts.setPrompt(
				ApplicationPromptID.INPUT_VALIDATION_ERROR,
				dto.meta.prompt,
			);
			dto.meta.prompt.meta = exception;
		} else if (exception instanceof DatabaseError) {
			const prompt = prompts.getPromptByCode(exception.code);
			prompts.setPrompt(prompt.promptId, dto.meta.prompt);
			dto.meta.prompt.meta = {};
		} else if (exception instanceof JWTTokenExpiredError) {
			dto.meta.prompt = new TokenExpiredError("token expired");
			dto.meta.prompt.meta = {};
		} else if (exception instanceof JsonWebTokenError) {
			dto.meta.prompt = new InvalidTokenError("token invalid");
			dto.meta.prompt.meta = {};
		} else if (exception instanceof BaseError) {
			prompts.setPrompt(exception.id, dto.meta.prompt);
			dto.meta.prompt.meta = exception.meta;
		} else {
			prompts.setPrompt(
				ApplicationPromptID.INTERNAL_SERVER_ERROR,
				dto.meta.prompt,
			);
			dto.meta.prompt.meta = {};
		}

		dto.data = metaDataBody?.data ? metaDataBody.data : [];

		const processData =
			request.processData ??
			OperationObject.create({
				service_name: AllExceptionsFilter.name,
				action: OperationConditionEnum.PROCESSING_COMPLETED_WITH_ERROR,
				request_body: metaDataBody,
			});

		// errorMessage and stackTrace must set!
		const buildProcessData: OperationObject = processData
			.setParentServiceId()
			.setServiceId()
			.setServiceName(AllExceptionsFilter.name)
			.setPromt(dto.meta.prompt)
			.setErrorMessage((exception as Error)?.message)
			.setStackTrace((exception as Error)?.stack);

		this.logger.error(buildProcessData);

		httpAdapter.reply(ctx.getResponse(), dto, HttpStatus.OK);
	}
}
