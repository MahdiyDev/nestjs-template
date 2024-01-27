import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { UserEntity } from "repositories/user/entity/user_entity";
import { UserRepository } from "repositories/user/user_repository";
import { UserCreateDto } from "services/user/dto/user_dto";
import { RequestWithPayload } from "common/interfaces/interface";
import { OperationConditionEnum } from "libs/operations";
import { setProcessData } from "libs/setProcessData";

import { AuthLoginDto } from "./dto/auth_login_dto";
import { UnauthorizedError } from "./error/unauthorized_error";
import { AuthDto } from "./dto/auth_dto";

export interface IPayload {
	sub: number;
	username: string;
}

@Injectable()
export class AuthService {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly jwtService: JwtService,
	) {}

	async login(dto: AuthLoginDto, req: RequestWithPayload) {
		setProcessData(
			req.processData,
			OperationConditionEnum.PROCESSING_IN_SERVER,
			AuthService.name,
		);

		const foundUser =
			await this.userRepository.readOneByUsernameAndPassword(
				dto.data[0] as UserEntity,
			);
		if (!foundUser.length) {
			throw new UnauthorizedError("Username: " + dto.data[0].username);
		}
		const payload: IPayload = {
			sub: foundUser[0].id,
			username: foundUser[0].username,
		};

		const accessToken = await this.jwtService.signAsync(payload);

		dto.data = [
			{
				access_token: "Bearer " + accessToken,
				user: foundUser,
			},
		] as unknown as AuthDto[];

		return dto;
	}

	async register(dto: UserCreateDto, req: RequestWithPayload) {
		setProcessData(
			req.processData,
			OperationConditionEnum.PROCESSING_IN_SERVER,
			AuthService.name,
		);

		const newUser = await this.userRepository.create(dto);
		const payload: IPayload = {
			sub: newUser[0].id,
			username: newUser[0].username,
		};

		const accessToken = await this.jwtService.signAsync(payload);

		dto.data = [
			{
				access_token: "Bearer " + accessToken,
				user: newUser,
			},
		] as unknown as AuthDto[];

		return dto;
	}

	verify(token: string) {
		return this.jwtService.verifyAsync<IPayload>(token);
	}
}
