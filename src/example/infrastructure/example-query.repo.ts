import { AnyBulkWriteOperation, BulkWriteOptions, Document, Filter, FindOptions } from 'mongodb';
import { Inject, Injectable } from '@nestjs/common';
import { MongoQueryRepo } from '../../common/infrastructure/mongo-query-repo';
import { Connection } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';

export interface ExampleQueryModel {
    id: string;
    name?: string;
}

@Injectable()
export class ExampleQueryRepo extends MongoQueryRepo<ExampleQueryModel & Document> {
    protected readonly indexes = [{ indexSpec: { name: 1 } }];

    constructor(@Inject(getConnectionToken()) connection: Connection) {
        super(connection.getClient(), 'example_read_model');
    }

    public async getMany() {
        return await this.collection.find({}).toArray();
    }

    public async getOne(filter: Filter<ExampleQueryModel & Document>, options?: FindOptions) {
        return await this.collection.findOne(filter, options);
    }

    public async bulkWrite(
        operations: AnyBulkWriteOperation<ExampleQueryModel & Document>[],
        options?: BulkWriteOptions,
    ) {
        return await this.collection.bulkWrite(operations, options);
    }
}
