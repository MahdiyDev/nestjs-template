## API Tempalte
API dto example:
```ts
export class MyDto extends BaseDto {
	@ApiProperty({
		type: [MyDataDto],
		default: [{  }] as MyDataDto[],
	})
	@IsNotEmpty()
	data: MyDataDto[];
}

```

## Error
Error example:
```ts
export class MyError extends BaseError {
	constructor(someMetaData: object) {
		super(
			PromptType.APPLICATION,
			ApplicationPromptID.MY_ERROR,
			{ key: someMetaData },
		);
	}
}
```

## Repository
Repository example:
```ts
export class MyRepository extends BaseRepository<MyEntity> {
	constructor(@InjectConnection() knex: Knex<MyEntity, MyEntity[]>) {
		super(knex, TableNames.MY_TABLE);
	}

	async customFunction(myEntity: MyEntity) {
		return await this.knex<MyEntity>(TableNames.MY_TABLE).select()
	}
}
```
Default functions (or methods): 
- `readAll`
- `readOneByKey`
- `readOneByKeyWithTransaction`
- `create`
- `createWithTransaction`
- `update`
- `updateWithTransaction`
- `delete`
- `deleteWithTransaction`

## Migration
For migration down:

```shell
./scripts/knex.sh migration:down
```

For migration up:

```shell
./scripts/knex.sh migration:up
```

For seed run:

```shell
./scripts/knex.sh seed:run
```
