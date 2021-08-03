import React, {useState, useEffect} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../store/reducers";
export const useClient = () => {
    return useSelector((state: RootState) => state.client)
};
