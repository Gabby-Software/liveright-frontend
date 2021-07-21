import React, {useState, useEffect} from 'react';
import Styles from './invoice-details.styles';
import {OptionType} from "../../../../types/option.type";

const InvoiceDetails = () => {
    return (
        <Styles className={'invoice-details'}>
            <div className={'invoice-details__item'}>
                <div className={'invoice-details__label'}>Issued on:</div>
                <div className={'invoice-details__value'}>22-05-2021</div>
            </div>
            <div className={'invoice-details__item'}>
                <div className={'invoice-details__label'}>Due on:</div>
                <div className={'invoice-details__value invoice-details__value__error'}>22-05-2021</div>
            </div>
            <div className={'invoice-details__item'}>
                <div className={'invoice-details__label'}>Currency</div>
                <div className={'invoice-details__value'}>USD</div>
            </div>
        </Styles>
    )
};

export default InvoiceDetails;
