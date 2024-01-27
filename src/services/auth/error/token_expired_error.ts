import { BaseError } from "common/errors/baseError";
import { ApplicationPromptID } from "libs/prompt/applicationPrompt";
import { PromptType } from "libs/prompt/prompt";

export class TokenExpiredError extends BaseError {
	constructor(name: string) {
		super(PromptType.APPLICATION, ApplicationPromptID.TOKEN_EXPIRED_ERROR, {
			required: name,
		});
	}
}
