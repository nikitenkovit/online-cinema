import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface GenreModel extends Base {}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class GenreModel extends TimeStamps {
	@prop()
	name: string;

	@prop({ unique: true })
	slug: string;

	@prop()
	description: string;

	@prop()
	icon: string;
}
