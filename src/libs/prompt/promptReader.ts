import { MetaPrompt } from "common/base/base_dto";

import { IPrompt, PromptType, prompts } from "./prompt";

export class PromptReader {
	private prompts: IPrompt[];
	constructor(type: PromptType) {
		this.prompts = prompts.get(type);
	}

	getPromptByCode(code: string) {
		return this.prompts.find((e) => e.promptCode === code);
	}

	getPromptById(id: number) {
		return this.prompts.find((e) => e.promptId === id);
	}

	setPrompt(id: number, metaPrompt: MetaPrompt) {
		const prompt = this.getPromptById(id);
		metaPrompt.id = prompt.promptId;
		metaPrompt.labels = prompt.promptLabels;
	}
}
