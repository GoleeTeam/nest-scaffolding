import { Module } from '@nestjs/common';
import { ExampleController } from './api/example.controller';
import { ExampleCommands } from './example.commands';
import { ExampleQueries } from './example.queries';
import { ExampleAggregateRepo, ExampleQueryRepo, ExampleRepoHooks } from './infrastructure';

export const exampleModuleProviders = [
    ExampleCommands,
    ExampleRepoHooks,
    ExampleQueries,
    ExampleQueryRepo,
    ExampleAggregateRepo,
];

@Module({
    controllers: [ExampleController],
    providers: exampleModuleProviders,
})
export class ExampleModule {}
