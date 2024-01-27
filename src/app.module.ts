import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { KnexModule } from "nest-knexjs";

import { AuthAdminMiddleware } from "api/http/auth/middleware/auth_admin_middleware";
import { AuthUserMiddleware } from "api/http/auth/middleware/auth_user_middleware";
import { knexOptions } from "config/knex";
import { LogTrackMiddleware } from "middleware/logTrackMiddleware";
import { AuthModule } from "modules/auth/auth_module";
import { UserRepository } from "repositories/user/user_repository";

@Module({
	imports: [
		JwtModule.register({
			secret: "2992332060",
			signOptions: { expiresIn: "24h" },
		}),
		KnexModule.forRoot(knexOptions),
		AuthModule,
	],
	controllers: [],
	providers: [UserRepository],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LogTrackMiddleware).forRoutes("*");
		consumer
			.apply(AuthUserMiddleware)
			.forRoutes({ path: "*/some-user-api", method: RequestMethod.POST });
		consumer.apply(AuthAdminMiddleware).forRoutes({
			path: "*/some-admin-api",
			method: RequestMethod.POST,
		});
	}
}
