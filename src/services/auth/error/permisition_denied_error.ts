import { BaseError } from "common/errors/baseError";
import { ApplicationPromptID } from "libs/prompt/applicationPrompt";
import { PromptType } from "libs/prompt/prompt";

export class PermisitionDeniedError extends BaseError {
	constructor(name: string) {
		super(
			PromptType.APPLICATION,
			ApplicationPromptID.PERMISITION_DENIED_ERROR,
			{ required: name },
		);
	}
}
