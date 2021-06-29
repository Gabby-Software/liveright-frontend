import {AxiosError} from "axios";

export const serverError: (e: AxiosError) => string = (e: AxiosError) => {
    if(e.response?.data?.errors) {
        return Object.values(e.response?.data?.errors)[0];
    }
    return e.response?.data?.message || e.message;
};
