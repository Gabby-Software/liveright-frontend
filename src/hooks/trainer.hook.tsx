import React, {useState, useEffect} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../store/reducers";
import {TrainerType} from "../types/trainer.type";
export const useTrainer = () => {
    return useSelector((state: RootState) => state.trainer) as TrainerType;
};
