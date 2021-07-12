import {AxiosError} from "axios";

export const serverError: (e: AxiosError) => string = (e: AxiosError) => {
    if(e.response?.data?.errors) {
        const err = Object.values(e.response?.data?.errors)[0] as string|string[];
        return typeof err === 'string' ? err : err[0];
    }
    return e.response?.data?.message || e.message;
};
