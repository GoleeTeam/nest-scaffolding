import { InjectMongo } from '@golee/mongo-nest';
import { Controller, Get, HttpException, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { MongoClient } from 'mongodb';

@Controller()
export class AppController {
    constructor(
        private readonly config: ConfigService,
        @InjectMongo() private readonly client: MongoClient,
    ) {}

    @Get()
    getHello(@Req() req: Request) {
        return `Hello from ${this.config.getOrThrow('ENV_NAME')} env`;
    }

    @Get('/health')
    async health() {
        if (await this.mongoIsConnected()) {
            return 'ok';
        } else {
            throw new HttpException('MongoDB is not connected', 503);
        }
    }

    private mongoIsConnected(): Promise<boolean> {
        return new Promise((resolve) => {
            this.client
                .db()
                .admin()
                .ping()
                .then(() => resolve(true))
                .catch(() => resolve(false));
        });
    }
}
