import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { GenericId, IAggregateRepo } from '../common';
import { ExampleAggregateRoot } from './domain';
import { ExampleAggregateRepo } from './infrastructure';

@Injectable()
export class ExampleCommands {
    constructor(@Inject(ExampleAggregateRepo) private readonly repo: IAggregateRepo<ExampleAggregateRoot>) {}

    public async createCmd() {
        const exampleAggregateRoot = ExampleAggregateRoot.createEmpty();
        await this.repo.save(exampleAggregateRoot);

        return exampleAggregateRoot.getId();
    }

    public async addNameCmd(exampleId: GenericId, name: string) {
        const exampleAggregateRoot = await this.repo.getById(exampleId);
        if (!exampleAggregateRoot) throw new NotFoundException();

        exampleAggregateRoot.addName(name);

        await this.repo.save(exampleAggregateRoot);
    }
}
