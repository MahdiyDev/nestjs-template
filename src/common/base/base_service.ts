// @Injectable()
// export class BaseService<TRepo extends BaseRepository<>> {
// 	constructor(private readonly repository: T) {}

// 	async readAll(dto: TaxonomyReadAllDto, req: RequestWithPayload) {
// 		dto.data = await this.repository.readAll(dto.data as TaxonomyEntity[]);
// 		return dto;
// 	}

// 	async readOne(_Dto, req: RequestWithPayload) {
// 		//
// 	}

// 	async create(dto: TaxonomyCreateDto, req: RequestWithPayload) {
// 		dto.data = await this.repository.create(dto.data);
// 		return dto;
// 	}
// }
