import { Body, Controller, Post, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { RequestWithPayload } from "common/interfaces/interface";
import { OperationConditionEnum } from "libs/operations";
import { setProcessData } from "libs/setProcessData";
import { AuthService } from "services/auth/auth_service";
import { AuthLoginDto } from "services/auth/dto/auth_login_dto";
import { UserCreateDto } from "services/user/dto/user_dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("login")
	login(@Req() req: RequestWithPayload, @Body() dto: AuthLoginDto) {
		setProcessData(
			req.processData,
			OperationConditionEnum.PROCESSING_IN_CONTROLLER,
			AuthController.name,
		);

		return this.authService.login(dto, req);
	}

	@Post("register")
	register(@Req() req: RequestWithPayload, @Body() dto: UserCreateDto) {
		setProcessData(
			req.processData,
			OperationConditionEnum.PROCESSING_IN_CONTROLLER,
			AuthController.name,
		);

		return this.authService.register(dto, req);
	}
}
