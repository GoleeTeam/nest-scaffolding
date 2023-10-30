import { MongoAggregateRepo } from '../../common';
import { ExampleAggregateRoot } from '../domain';
import { ExampleMongoSerializer } from './example.serializer';
import { Connection } from 'mongoose';
import { ExampleRepoHooks } from './example.repo-hooks';

export interface ExampleAggregateModel {
    id: string;
    name?: string;
}

export class ExampleAggregateRepo {
    public static providerFactory(conn: Connection, exampleRepoHooks: ExampleRepoHooks) {
        return new MongoAggregateRepo<ExampleAggregateRoot, ExampleAggregateModel>(
            new ExampleMongoSerializer(),
            conn.getClient(),
            'example_write_model',
            exampleRepoHooks,
        );
    }
}
