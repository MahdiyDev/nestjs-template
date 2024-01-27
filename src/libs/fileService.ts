import { extname } from "path";

export const imageFileFilter = (
	req: Express.Request,
	file: Express.Multer.File,
	callback: (error: Error, acceptFile: boolean) => void,
) => {
	const foundExtension = file.originalname.match(/\.(jpg|jpeg|png|gif)$/i);

	if (!foundExtension) {
		return callback(new Error("Only image files are allowed!"), false);
	}

	callback(null, true);
};

export const editFileName = (
	req: unknown,
	file: Express.Multer.File,
	callback: (error: Error, acceptFile: string) => void,
) => {
	const name = file.originalname.split(".")[0];
	const fileExtName = extname(file.originalname);
	const randomName = Array(4)
		.fill(null)
		.map(() => Math.round(Math.random() * 16).toString(16))
		.join("");

	callback(null, `${name}-${randomName}${fileExtName}`);
};
