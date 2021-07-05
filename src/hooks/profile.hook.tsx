import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../store/reducers";
import {ProfileDataType} from "../types/profile-data.type";

export const useProfile = () => {
    return useSelector((state:RootState) => state.account) as ProfileDataType;
};
