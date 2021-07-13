import {TrainerType} from "../../types/trainer.type";
import {withStorage} from "./storage.hook";
import {ACTION_GET_TRAINER_SUCCESS, ActionType} from "../action-types";
import profilePlaceholder from '../../assets/media/profile-placeholder.png';

const initialValues: TrainerType = {
    phone_number: '+972509984226',
    address: 'Sumsum street 32/9',
    city: 'Tel Aviv',
    country: 'Israel',
    about: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet ipsa itaque mollitia veniam vero! Ex exercitationem expedita impedit iusto nemo nihil tenetur vel! Cum impedit necessitatibus quas. Amet, illo, ut.',
    qualifications: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet ipsa itaque mollitia veniam vero! Ex exercitationem expedita impedit iusto nemo nihil tenetur vel! Cum impedit necessitatibus quas. Amet, illo, ut.',
    additional_information: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet ipsa itaque mollitia veniam vero! Ex exercitationem expedita impedit iusto nemo nihil tenetur vel! Cum impedit necessitatibus quas. Amet, illo, ut.',
    terms_and_conditions: {
        name: 'terms-and-conditions',
        file_name: 'terms-and-conditions.pdf',
        url: 'http://www.africau.edu/images/default/sample.pdf',
        mime_type: 'application/pdf'
    },
    avatar: profilePlaceholder,
    avatar_thumb: profilePlaceholder,
    birthday: '1990-05-05',
    created_at: '2020-08-04',
    email: 'trainer@gmail.com',
    first_name: 'Eden',
    last_name: 'Arlozorov',
    gender: 'male',
};

export const trainerReducer = withStorage((state=initialValues, {type, payload}: ActionType<any>) => {
    switch(type) {
        case ACTION_GET_TRAINER_SUCCESS:
            return payload;
        default:
            return state;
    }
}, initialValues, 'trainer');
