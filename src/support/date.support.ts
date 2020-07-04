import * as moment from 'moment';

export const convertToDashedDateString = (date: Date): string => {
    const momentDate = moment(date);
    return momentDate.format("yyyy-MM-DD");
};
