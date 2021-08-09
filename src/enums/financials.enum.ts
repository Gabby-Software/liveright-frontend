import {OptionType} from "../types/option.type";

export const statisticRange = {
    MONTH: 'month',
    QUARTER: 'quarter',
    YEAR: 'year'
};

export const statisticRangeOptions: OptionType[] = [
    {label: 'Month', value: statisticRange.MONTH},
    {label: 'Quarter', value: statisticRange.QUARTER},
    {label: 'Year', value: statisticRange.YEAR}
];