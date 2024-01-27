import { v4 } from "uuid";

import { MetaPrompt } from "common/base/base_dto";

export enum OperationConditionEnum {
	PROCESSING_STARTED = "PROCESSING_STARTED",
	PROCESSING_IN_CONTROLLER = "PROCESSING_IN_CONTROLLER",
	PROCESSING_IN_SERVER = "PROCESSING_IN_SERVER",
	PROCESSING_IN_REPOSITORY = "PROCESSING_IN_REPOSITORY",
	PROCESSING_COMPLETED_WITH_ERROR = "PROCESSING_COMPLETED_WITH_ERROR",
	PROCESSING_COMPLETED_WITH_SUCCESS = "PROCESSING_COMPLETED_WITH_SUCCESS",
	PROCESSING_COMPLETED_WITH_SUGGESTION = "PROCESSING_COMPLETED_WITH_SUGGESTION",
	PROCESSING_COMPLETED_WITH_WARNING = "PROCESSING_COMPLETED_WITH_WARNING",
	PROCESSING_COMPLETED_WITH_QUESTION = "PROCESSING_COMPLETED_WITH_QUESTION",
	PROCESSING_COMPLETED_WITH_UNKNOWN_RESULT = "PROCESSING_COMPLETED_WITH_UNKNOWN_RESULT",
	INFO = "INFO",
	DEBUG = "DEBUG",
}

export interface OperationParams {
	service_name: string;
	action: OperationConditionEnum;
	request_body: object;
}
export interface IMeta {
	prompt: MetaPrompt | null;
	request_body: object;
	error_massage: string | null;
	stack_trace: string | null;
}
export interface Operation {
	service_name: string;
	action: OperationConditionEnum;
	meta: IMeta;
	[k: string]: unknown;
}

export class OperationObject {
	public proccess_id: string;
	public service_id: string;
	public parent_service_id: string | null;
	public service_name: string;
	public action: OperationConditionEnum;

	public meta: IMeta;

	private constructor(
		service_name: string,
		action: OperationConditionEnum,
		request_body: object,
	) {
		this.proccess_id = v4();
		this.service_id = v4();
		this.parent_service_id = null;
		this.service_name = service_name;
		this.action = action;
		this.meta = {
			prompt: null,
			request_body,
			error_massage: null,
			stack_trace: null,
		};
	}

	public setPromt(prompt: MetaPrompt): OperationObject {
		this.meta.prompt = prompt;
		return this;
	}

	public setErrorMessage(error_massage: string): OperationObject {
		this.meta.error_massage = error_massage;
		return this;
	}

	public setStackTrace(stack_trace: string): OperationObject {
		this.meta.stack_trace = stack_trace;
		return this;
	}

	public setServiceId(): OperationObject {
		this.service_id = v4();
		return this;
	}

	public setParentServiceId(): OperationObject {
		this.parent_service_id = this.service_id;
		return this;
	}

	public setServiceName(service_name: string): OperationObject {
		this.service_name = service_name;
		return this;
	}

	public setAction(action: OperationConditionEnum): OperationObject {
		this.action = action;
		return this;
	}

	static create(params: OperationParams): OperationObject {
		return new OperationObject(
			params.service_name,
			params.action,
			params.request_body,
		);
	}
}
