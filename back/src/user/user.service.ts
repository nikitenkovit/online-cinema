import { Injectable, NotFoundException } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { genSalt, hash } from 'bcryptjs';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserModel } from './user.model';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>
	) {}
	async byId(_id: string) {
		const user = await this.UserModel.findById(_id);

		if (!user) {
			throw new NotFoundException('User not found!');
		}

		return user;
	}

	async updateProfile(_id: string, dto: UpdateUserDto) {
		const user = await this.byId(_id);
		const isSameUser = await this.UserModel.findOne({ email: dto.email });

		if (isSameUser && String(_id) !== String(isSameUser._id)) {
			throw new NotFoundException('Email already exists!');
		}

		if (dto.password) {
			const salt = await genSalt(10);
			user.password = await hash(dto.password, salt);
		}

		user.email = dto.email;

		if (dto.isAdmin || dto.isAdmin === false) {
			user.isAdmin = dto.isAdmin;
		}

		await user.save();

		return;
	}

	async getCount() {
		return this.UserModel.find().countDocuments().exec();
	}

	async getAll(searchTerm?: string) {
		let options = {};

		if (searchTerm) {
			options = {
				$or: [
					{
						email: new RegExp(searchTerm, 'i'),
					},
				],
			};
		}

		return this.UserModel.find(options)
			.select('-password -updateAt -__v')
			.sort({ createdAt: 'desc' })
			.exec();
	}

	async delete(id: string) {
		return this.UserModel.findByIdAndDelete(id).exec();
	}

	async toggleFavorites(
		movieId: Types.ObjectId,
		{ _id, favorites }: UserModel
	) {
		await this.UserModel.findByIdAndUpdate(_id, {
			favorites: favorites.includes(movieId)
				? favorites.filter((id) => String(id) !== String(movieId))
				: [...favorites, movieId],
		});
	}

	async getFavoriteMovies(_id: Types.ObjectId) {
		return this.UserModel.findById(_id, 'favorites')
			.populate({
				path: 'favorites',
				populate: {
					path: 'genres',
				},
			})
			.exec()
			.then((user) => user.favorites);
	}
}
