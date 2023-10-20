import { MongoMemoryReplSet } from 'mongodb-memory-server';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoAggregateRepo } from '../../common';
import { MembershipFeesAggregate } from '../domain/membership-fees.aggregate';
import { membershipFeesAggregateRepo } from '../membership-fees.module';
import { Connection } from 'mongoose';
import { MembershipFeesSerializer } from '../infrastructure/membership-fees.serializer';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { MembershipFeesCommands } from '../membership-fees.commands';
import { MembershipFeesId } from '../domain/membership-fees-id';

describe('Membership Fees Component Test', () => {
    let module: TestingModule;
    let mongodb: MongoMemoryReplSet;
    let commands: MembershipFeesCommands;
    let aggregateRepo: MongoAggregateRepo<MembershipFeesAggregate, MembershipFeesAggregateModel>;

    beforeAll(async () => {
        mongodb = await MongoMemoryReplSet.create({
            replSet: {
                count: 1,
                dbName: 'test',
                storageEngine: 'wiredTiger',
            },
        });

        module = await Test.createTestingModule({
            providers: [
                MembershipFeesCommands,
                {
                    provide: membershipFeesAggregateRepo,
                    inject: [getConnectionToken()],
                    useFactory: (conn: Connection) => {
                        return new MongoAggregateRepo<MembershipFeesAggregate, MembershipFeesAggregateModel>(
                            new MembershipFeesSerializer(),
                            conn.getClient(),
                            'membership_fees_aggregate',
                        );
                    },
                },
            ],
            imports: [MongooseModule.forRoot(mongodb.getUri('test'))],
        }).compile();

        commands = module.get<MembershipFeesCommands>(MembershipFeesCommands);
        aggregateRepo =
            module.get<MongoAggregateRepo<MembershipFeesAggregate, MembershipFeesAggregateModel>>(
                membershipFeesAggregateRepo,
            );
        await aggregateRepo.onModuleInit();
    });

    afterEach(async () => {
        jest.resetAllMocks();
    });

    afterAll(async () => {
        await module.close();
        await mongodb.stop();
    });

    describe('When create example', () => {
        let membershipFeesId: MembershipFeesId;
        beforeEach(async () => {
            membershipFeesId = await commands.createCmd();
        });

        it('should be saved into write model', async () => {
            expect(await aggregateRepo.getById(membershipFeesId)).toBeDefined();
        });
    });
});