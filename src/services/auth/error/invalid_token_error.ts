import { BaseError } from "common/errors/baseError";
import { ApplicationPromptID } from "libs/prompt/applicationPrompt";
import { PromptType } from "libs/prompt/prompt";

export class InvalidTokenError extends BaseError {
	constructor(name: string) {
		super(
			PromptType.APPLICATION,
			ApplicationPromptID.INPUT_VALIDATION_ERROR,
			{ required: name },
		);
	}
}
