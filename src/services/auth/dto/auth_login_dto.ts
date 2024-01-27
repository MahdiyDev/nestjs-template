import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

import { BaseDto } from "common/base/base_dto";

import { AuthDto } from "./auth_dto";

export class AuthLoginDto extends BaseDto {
	@ApiProperty({
		type: [AuthDto],
		default: [{ username: "user", password: "password" } as AuthDto],
	})
	@IsNotEmpty()
	data: AuthDto[];
}
