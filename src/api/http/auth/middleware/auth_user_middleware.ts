import { Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";

import { UserRepository } from "repositories/user/user_repository";
import { IPayload } from "services/auth/auth_service";
import { InvalidTokenError } from "services/auth/error/invalid_token_error";
import { PermisitionDeniedError } from "services/auth/error/permisition_denied_error";

@Injectable()
export class AuthUserMiddleware implements NestMiddleware {
	constructor(
		private readonly jwtService: JwtService,
		private readonly userRepository: UserRepository,
	) {}
	async use(req: Request, res: Response, next: NextFunction) {
		let token = "";
		let user: IPayload = {
			sub: null,
			username: null,
		};

		if (req.headers.authorization) {
			token = req.headers.authorization.split("Bearer ")[1];
			user = this.jwtService.verify(token);
		}

		if (!user.sub || !user.username) {
			throw new InvalidTokenError("invalid token");
		}

		const admin = await this.userRepository.readOneByKey("id", user.sub);

		if (!admin.length) {
			throw new PermisitionDeniedError("permisition denied");
		}

		next();
	}
}
