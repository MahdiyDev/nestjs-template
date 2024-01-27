import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
	ArrayMinSize,
	IsArray,
	IsNotEmpty,
	IsString,
	ValidateNested,
} from "class-validator";

import { BaseDto } from "common/base/base_dto";

export class UserDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	username: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	password: string;
}

export class UserCreateDto extends BaseDto {
	@IsArray()
	@ValidateNested({ each: true })
	@ArrayMinSize(1)
	@Type(() => UserDto)
	data!: UserDto[];
}
