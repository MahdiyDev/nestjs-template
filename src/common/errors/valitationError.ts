import { ValidationError } from "class-validator";

export interface IValidationError {
	property: string;
	message: string[];
}

export class CustomValidationError {
	private readonly validationError: IValidationError[] = [];
	constructor(error: ValidationError[]) {
		error.map((e) => {
			this.mappingError(e);
		});
	}

	mappingError(error: ValidationError) {
		if (!error.target) {
			return;
		}
		if (error.constraints) {
			this.validationError.push({
				property: error.property,
				message: Object.values(error.constraints),
			});
		}
		if (error.children) {
			error.children.map((target) => this.mappingError(target));
		}
	}
}
