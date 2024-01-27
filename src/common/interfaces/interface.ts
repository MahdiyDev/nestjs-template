import { OperationObject } from "libs/operations";

export interface RequestWithPayload extends Request {
	processData: OperationObject;
}
