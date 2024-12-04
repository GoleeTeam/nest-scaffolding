import { InjectMongo } from '@golee/mongo-nest';
import { MongoClient } from 'mongodb';
import { MongoAggregateRepo } from '../../common';
import { ExampleAggregateRoot } from '../domain';
import { ExampleRepoHooks } from './example.repo-hooks';
import { ExampleMongoSerializer } from './example.serializer';

export interface ExampleAggregateModel {
    id: string;
    name?: string;
}

export class ExampleAggregateRepo extends MongoAggregateRepo<ExampleAggregateRoot, ExampleAggregateModel> {
    constructor(@InjectMongo() mongoClient: MongoClient, exampleRepoHooks: ExampleRepoHooks) {
        super(new ExampleMongoSerializer(), mongoClient, 'example_write_model', exampleRepoHooks);
    }
}
