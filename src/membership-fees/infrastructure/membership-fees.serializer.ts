import { ISerializer } from '../../common';
import { MembershipFeesAggregate } from '../domain/membership-fees.aggregate';
import { MembershipFeesAggregateModel } from './membership-fees-aggregate.model';
import { MemberId } from '../../member-registration/domain/ids/member-id';

export class MembershipFeesSerializer implements ISerializer<MembershipFeesAggregate, MembershipFeesAggregateModel> {
    public aggregateModelToAggregate(aggregateModel: MembershipFeesAggregateModel): MembershipFeesAggregate {
        return new MembershipFeesAggregate(MemberId.fromString(aggregateModel.id), aggregateModel.fees);
    }

    public aggregateToAggregateModel(aggregate: MembershipFeesAggregate): MembershipFeesAggregateModel {
        return { id: aggregate.id.toString(), fees: aggregate['fees'] };
    }
}
