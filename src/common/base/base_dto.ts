import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
	IsArray,
	IsDefined,
	IsNotEmptyObject,
	IsObject,
	IsOptional,
	ValidateNested,
} from "class-validator";

import { ResponseStatusType } from "../enums/response_status_type_enum";

export class MetaPrompt {
	id: number;
	labels: string[];
	meta: object;
}

export class MetaDto {
	@IsOptional()
	type: ResponseStatusType = ResponseStatusType.SUCCESS;

	@IsOptional()
	taskId: string;

	@ApiProperty()
	@IsDefined()
	@IsObject()
	params: object;

	// @ApiProperty({ default: RpcMethod.TAXONOMY_READ_ALL })
	// @IsNotEmpty()
	// method: RpcMethod;

	prompt: MetaPrompt;
}

export class BaseDto {
	@ApiProperty({ type: MetaDto })
	@IsDefined()
	@IsNotEmptyObject()
	@IsObject()
	@ValidateNested()
	@Type(() => MetaDto)
	meta!: MetaDto;

	@ApiProperty({ default: [] })
	@IsDefined()
	@IsArray()
	data!: unknown[];
}
