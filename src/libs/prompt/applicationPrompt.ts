import { CustomPrompt } from "./prompt";

export enum ApplicationPromptID {
	INPUT_VALIDATION_ERROR = 259,
	METHOD_NOT_FOUND_ERROR = 260,
	INTERNAL_SERVER_ERROR = 260,
	UNAUTHORIZED_ERROR = 261,
	INVALID_TOKEN_ERROR = 262,
	TOKEN_EXPIRED_ERROR = 263,
	PERMISITION_DENIED_ERROR = 264,
}

export type IApplicationPrompt = CustomPrompt<
	ApplicationPromptID,
	"application"
>;

export const ApplicationPrompts: IApplicationPrompt[] = [
	{
		promptId: ApplicationPromptID.INPUT_VALIDATION_ERROR,
		promptType: "application",
		promptCode: "",
		promptCondition: "input_validation_error",
		promptLabels: [
			"Input validation error",
			"Input validation error",
			"Input validation error",
		],
	},
	{
		promptId: ApplicationPromptID.METHOD_NOT_FOUND_ERROR,
		promptType: "application",
		promptCode: "",
		promptCondition: "method_not_found_error",
		promptLabels: [
			"Method not found error",
			"Method not found error",
			"Method not found error",
		],
	},
	{
		promptId: ApplicationPromptID.INTERNAL_SERVER_ERROR,
		promptType: "application",
		promptCode: "",
		promptCondition: "internal_server_error",
		promptLabels: [
			"Internal server error",
			"Internal server error",
			"Internal server error",
		],
	},
	{
		promptId: ApplicationPromptID.UNAUTHORIZED_ERROR,
		promptType: "application",
		promptCode: "",
		promptCondition: "unauthorized_error",
		promptLabels: [
			"Unauthorized error",
			"Unauthorized error",
			"Unauthorized error",
		],
	},
	{
		promptId: ApplicationPromptID.INVALID_TOKEN_ERROR,
		promptType: "application",
		promptCode: "",
		promptCondition: "invalid_token_error",
		promptLabels: [
			"Invalid token error",
			"Invalid token error",
			"Invalid token error",
		],
	},
	{
		promptId: ApplicationPromptID.TOKEN_EXPIRED_ERROR,
		promptType: "application",
		promptCode: "",
		promptCondition: "token_expired_error",
		promptLabels: [
			"Token expired error",
			"Token expired error",
			"Token expired error",
		],
	},
	{
		promptId: ApplicationPromptID.PERMISITION_DENIED_ERROR,
		promptType: "application",
		promptCode: "",
		promptCondition: "permisition_denied_error",
		promptLabels: [
			"Permisition denied error",
			"Permisition denied error",
			"Permisition denied error",
		],
	},
];
