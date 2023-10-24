import { GenericId } from '../../../common';

export class FeeId extends GenericId<'fee'> {
    // in order to have incompatible types, between other extended GenericId classes, type must be set as READONLY!!
    readonly type = 'fee';
}
