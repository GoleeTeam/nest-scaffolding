import { MongoAggregateRepo } from '../../common';
import { ExampleAggregateRoot } from '../domain';
import { ExampleMongoSerializer } from './example.serializer';
import { Connection } from 'mongoose';
import { ExampleRepoHooks } from './example.repo-hooks';
import { Inject } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';

export interface ExampleAggregateModel {
    id: string;
    name?: string;
}

export class ExampleAggregateRepo extends MongoAggregateRepo<ExampleAggregateRoot, ExampleAggregateModel> {
    constructor(@Inject(getConnectionToken()) conn: Connection, exampleRepoHooks: ExampleRepoHooks) {
        super(new ExampleMongoSerializer(), conn.getClient(), 'example_write_model', exampleRepoHooks);
    }
}
