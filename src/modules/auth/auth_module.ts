import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { AuthController } from "api/http/auth/auth_controller";
import { UserRepository } from "repositories/user/user_repository";
import { AuthService } from "services/auth/auth_service";

@Module({
	imports: [
		PassportModule.register({ defaultStrategy: "jwt" }),
		JwtModule.register({
			secret: "2992332060",
			signOptions: { expiresIn: "24h" },
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, UserRepository],
})
export class AuthModule {}
