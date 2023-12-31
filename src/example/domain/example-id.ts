import { GenericId } from '../../common';

export class ExampleId extends GenericId<'example'> {
    // in order to have incompatible types, between other extended GenericId classes, type must be set as READONLY!!
    readonly type = 'example';
}
