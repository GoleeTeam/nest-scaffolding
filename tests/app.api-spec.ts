import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import { ConfigService } from '@nestjs/config';

describe('AppController (api)', () => {
    let mongodb: MongoMemoryReplSet;
    let app: INestApplication;

    class ConfigServiceFake {
        get(key: string) {
            switch (key) {
                case 'MONGODB_URI':
                    return mongodb.getUri('test');
                case 'LOG_LEVEL':
                    return 'debug';
                default:
                    return '';
            }
        }
        getOrThrow(key: string) {
            return this.get(key);
        }
    }

    beforeAll(async () => {
        mongodb = await MongoMemoryReplSet.create({
            replSet: {
                count: 1,
                dbName: 'test',
                storageEngine: 'wiredTiger',
            },
        });
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideProvider(ConfigService)
            .useClass(ConfigServiceFake)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });
});
