import { prop, Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

import { ActorModel } from 'src/actor/actor.model';
import { GenreModel } from 'src/genre/genre.model';

export class Parameters {
	@prop()
	year: number;

	@prop()
	duration: number;

	@prop()
	country: string;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface MovieModel extends Base {}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class MovieModel extends TimeStamps {
	@prop()
	poster: string;

	@prop()
	bigPoster: string;

	@prop()
	title: string;

	@prop({ unique: true })
	slug: string;

	@prop()
	parameters?: Parameters;

	@prop({ default: 4 })
	rating?: number;

	@prop({ default: 0 })
	countOpened?: number;

	@prop()
	videoUrl: string;

	@prop({ ref: () => GenreModel })
	genres: Ref<GenreModel>[];

	@prop({ ref: () => ActorModel })
	actors: Ref<ActorModel>[];

	@prop({ default: false })
	isSendTelegram?: boolean;
}
