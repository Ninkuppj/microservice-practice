import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import * as entity from './entities'
export function connectDB() {
    return TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT ?? "5432"),
        username: process.env.POSTGRES_USER,
        password:  process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        entities: entity,
        migrations: ['dist/migrations/**/*.js'],
        synchronize: true,
    });
}