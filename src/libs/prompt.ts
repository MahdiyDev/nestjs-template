import * as fs from "fs";

import { MetaPrompt } from "common/base/base_dto";
import { config } from "config/env";

export interface IPrompts {
	promptId: number;
	promptType: "postgres" | "application";
	promptCode: string;
	promptCondition: string;
	promptLabels: string[];
}

export class Prompts {
	private prompts: IPrompts[];
	constructor() {
		this.prompts = JSON.parse(
			fs.readFileSync(
				config.CONSTANTS_FILE_DIR + "/prompts/prompts.json",
				"utf8",
			),
		) as unknown as IPrompts[];
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
