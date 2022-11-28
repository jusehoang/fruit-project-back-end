import { Order } from './../entities/order.entity';
import { Cart } from './../entities/cart.entity';
import { Category } from './../entities/category.entity';
import { Product } from './../entities/product.entity';
import { User } from '../entities/user.entity';
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const ENTITY_MODEL = [
	User,
	Product,
	Category,
	Cart,
	Order
];

export async function databaseProviderFactory(configService: ConfigService): Promise<TypeOrmModuleOptions> {
	const databaseConfig = configService.get('database');

	return {
		type: databaseConfig.type,
		host: databaseConfig.host,
		port: databaseConfig.port,
		username: databaseConfig.username,
		password: databaseConfig.password,
		database: databaseConfig.database,
		synchronize: databaseConfig.sync,
		entitys: ENTITY_MODEL,
		logging: true,
		autoLoadEntities: true
	}
}