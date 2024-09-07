import { ConfigService } from '@nestjs/config';
import { ITelegramOptions } from 'src/telegram/telegram.interface';

export const getTelegramConfig = (
	configService: ConfigService
): ITelegramOptions => ({
	// https://api.telegram.org/bot5070807616:AAGHWhiD9qTMz68gz6yccEXGRtY8x0ohOb0/getUpdates - for get chatID
	chatId: configService.get('TELEGRAM_CHAT_ID'),
	token: configService.get('TELEGRAM_TOKEN'),
});
