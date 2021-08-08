import {reduce} from 'lodash';

export const queryFiltersPipe = (filters: object) => {
    return reduce(filters, (acc, it, key) => {
        return {
            ...acc,
            [`filter[${key}]`]: it,
        }
    }, {})
};
