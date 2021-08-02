import {OptionType} from "../types/option.type";

export const sessionStatusOptions:OptionType[] = [
    {label: 'All', value: 'All'},
    {label: 'Booked', value: 'Booked'},
    {label: 'Cancelled', value: 'Cancelled'},
    {label: 'Completed', value: 'Completed'},
];

export const sessionTimelineOptions:OptionType[] = [
    {label: 'All', value: 'All'},
    {label: 'Future', value: 'Future'},
    {label: 'Past', value: 'Past'}
];

export const sessionTypeOptions:OptionType[] = [
    {label: 'All', value: 'All'},
    {label: 'Paid PT', value: 'Paid PT'},
    {label: 'Complimentary', value: 'Complimentary'},
    {label: 'Consulting', value: 'Consulting'},
    {label: 'Coaching', value: 'Coaching'}
];
