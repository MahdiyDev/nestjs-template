import { BaseError } from "common/errors/baseError";
import { ApplicationPromptID } from "libs/prompt/applicationPrompt";
import { PromptType } from "libs/prompt/prompt";

export class UnauthorizedError extends BaseError {
	constructor(name: string) {
		super(PromptType.APPLICATION, ApplicationPromptID.UNAUTHORIZED_ERROR, {
			required: name,
		});
	}
}
