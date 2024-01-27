import { Logger } from "@nestjs/common";

import { OperationConditionEnum, OperationObject } from "./operations";

export const setProcessData = (
	processData: OperationObject,
	operationConditionEnum: OperationConditionEnum,
	serviceName: string,
): void => {
	const logger = new Logger(serviceName);

	const buildProcessData: OperationObject = processData
		.setParentServiceId()
		.setServiceId()
		.setServiceName(serviceName)
		.setAction(operationConditionEnum);

	logger.log(buildProcessData);
};
