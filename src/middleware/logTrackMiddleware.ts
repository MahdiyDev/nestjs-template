import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Response } from "express";

import { RequestWithPayload } from "common/interfaces/interface";
import { OperationConditionEnum, OperationObject } from "libs/operations";

@Injectable()
export class LogTrackMiddleware implements NestMiddleware {
	private readonly logger = new Logger(LogTrackMiddleware.name);

	use(req: RequestWithPayload, res: Response, next: NextFunction) {
		const body = req.body as object;

		const processData = OperationObject.create({
			service_name: LogTrackMiddleware.name,
			action: OperationConditionEnum.PROCESSING_STARTED,
			request_body: body,
		});

		this.logger.log(processData);

		req.processData = processData;

		next();
	}
}
