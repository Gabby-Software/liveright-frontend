import React, {useState, useEffect} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../store/reducers";
export const useClients = () => {
    return useSelector((state: RootState) => state.clients);
};
