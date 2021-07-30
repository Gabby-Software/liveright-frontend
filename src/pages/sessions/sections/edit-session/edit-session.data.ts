import {AddSessionFormType} from "../add-session/add-session-form/add-session-form.component";
import {serviceTypes} from "../../../../enums/service-type.enum";

export const sessionData: AddSessionFormType = {
    type: serviceTypes.PT_SESSION,
    date: '2022-05-06',
    time: '10:30',
    duration: '45',
    notes: '',
    client_id: 12,
    sessions: 0
};
