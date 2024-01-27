import { BaseDto } from "common/base/base_dto";

export function classValidator<T extends BaseDto, K extends BaseDto>(
	ValDto: new () => T,
	setterDto: K,
) {
	const valDto = new ValDto();
	valDto.meta = setterDto.meta;
	valDto.data = [];
	setterDto.data.map((e, i) => {
		Object.keys(e).map((k) => {
			valDto.data[i][k] = e[k] as unknown;
		});
	});
	return valDto;
}
