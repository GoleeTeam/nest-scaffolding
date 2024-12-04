import { ISerializer } from '../../common';
import { ExampleAggregateRoot } from '../domain';
import { ExampleId } from '../domain/example-id';
import { ExampleAggregateModel } from './example-aggregate.repo';

export class ExampleMongoSerializer implements ISerializer<ExampleAggregateRoot, ExampleAggregateModel> {
    public aggregateToAggregateModel(aggregate: ExampleAggregateRoot): ExampleAggregateModel {
        return {
            id: aggregate.getId().toString(),
            name: aggregate['name'],
        };
    }

    public aggregateModelToAggregate(writeModel: ExampleAggregateModel) {
        return new ExampleAggregateRoot(ExampleId.fromString(writeModel.id), writeModel.name);
    }
}
