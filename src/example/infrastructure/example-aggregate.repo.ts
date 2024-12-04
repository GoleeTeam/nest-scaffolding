import { MongoAggregateRepo } from '../../common';
import { ExampleAggregateRoot } from '../domain';
import { ExampleMongoSerializer } from './example.serializer';
import { ExampleRepoHooks } from './example.repo-hooks';
import { MongoClient } from 'mongodb';
import { InjectMongo } from '@golee/mongo-nest';

export interface ExampleAggregateModel {
    id: string;
    name?: string;
}

export class ExampleAggregateRepo extends MongoAggregateRepo<ExampleAggregateRoot, ExampleAggregateModel> {
    constructor(@InjectMongo() mongoClient: MongoClient, exampleRepoHooks: ExampleRepoHooks) {
        super(new ExampleMongoSerializer(), mongoClient, 'example_write_model', exampleRepoHooks);
    }
}
