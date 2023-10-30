import { ExampleQueries } from './example.queries';
import { ExampleAggregateRepo, ExampleQueryRepo, ExampleRepoHooks } from './infrastructure';
import { Module } from '@nestjs/common';
import { ExampleController } from './api/example.controller';
import { getConnectionToken } from '@nestjs/mongoose';
import { ExampleCommands } from './example.commands';

export const exampleModuleProviders = [
    ExampleCommands,
    ExampleRepoHooks,
    ExampleQueries,
    {
        provide: ExampleAggregateRepo,
        inject: [getConnectionToken(), ExampleRepoHooks],
        useFactory: ExampleAggregateRepo.providerFactory,
    },
    {
        provide: ExampleQueryRepo,
        inject: [getConnectionToken()],
        useFactory: ExampleQueryRepo.providerFactory,
    },
];

@Module({
    controllers: [ExampleController],
    providers: exampleModuleProviders,
})
export class ExampleModule {}
