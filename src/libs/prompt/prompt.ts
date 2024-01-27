import { ApplicationPrompts } from "./applicationPrompt";
import { PostgresPrompts } from "./postgresPrompt";

export type IPromptType = "postgres" | "application";

export enum PromptType {
	POSTGRES = 1,
	APPLICATION = 2,
}

export interface IPrompt {
	promptId: number;
	promptType: IPromptType;
	promptCode: string;
	promptCondition: string;
	promptLabels: string[];
}

export interface CustomPrompt<I extends number, T extends IPromptType>
	extends IPrompt {
	promptId: I;
	promptType: T;
}

const prompts = new Map<PromptType, IPrompt[]>();
prompts.set(PromptType.APPLICATION, ApplicationPrompts as IPrompt[]);
prompts.set(PromptType.POSTGRES, PostgresPrompts as IPrompt[]);
export { prompts };
