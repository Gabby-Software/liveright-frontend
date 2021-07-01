import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../store/reducers";

export const useProfile = () =>{
    return useSelector((state:RootState) => state.account);
};
