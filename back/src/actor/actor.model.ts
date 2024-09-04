import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface ActorModel extends Base {}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class ActorModel extends TimeStamps {
	@prop()
	name: string;

	@prop({ unique: true })
	slug: string;

	@prop()
	photo: string;
}
