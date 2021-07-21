import React, {useState, useEffect} from 'react';
import Styles from './invoice-mobile-summary.styles';

const InvoiceMobileSummary = () => {
    return (
        <Styles className={'invoice-m-summary'}>
            <div className={'invoice-m-summary__row'}>
                <div className={'invoice-m-summary__item invoice-m-summary__bold'}>Item</div>
                <div className={'invoice-m-summary__item invoice-m-summary__bold'}>Cost</div>
            </div>
            <div className={'invoice-m-summary__row'}>
                <div className={'invoice-m-summary__item invoice-m-summary__bold'}>
                    <div className={'invoice-m-summary__item invoice-m-summary__ebold'}>Coaching</div>
                    <div className={'invoice-m-summary__item'}>Consultation for one</div>
                </div>
                <div className={'invoice-m-summary__item invoice-m-summary__bold'}>461 USD</div>
            </div>
            <div className={'invoice-m-summary__row invoice-m-summary__row__space'}>
                <div className={'invoice-m-summary__item'}>1 X 461 USD</div>
                <div className={'invoice-m-summary__item'}>(46.1 USD VAT)</div>
            </div>
            <div className={'invoice-m-summary__row'}>
                <div className={'invoice-m-summary__item invoice-m-summary__bold'}>
                    <div className={'invoice-m-summary__item invoice-m-summary__ebold'}>Session</div>
                    <div className={'invoice-m-summary__item'}>PT Session</div>
                </div>
                <div className={'invoice-m-summary__item invoice-m-summary__bold'}>461 USD</div>
            </div>
            <div className={'invoice-m-summary__row invoice-m-summary__row__space'}>
                <div className={'invoice-m-summary__item'}>1 X 461 USD</div>
                <div className={'invoice-m-summary__item'}>(46.1 USD VAT)</div>
            </div>
            <div className={'invoice-m-summary__hr'}/>
            <div className={'invoice-m-summary__row invoice-m-summary__row__big'}>
                <div className={'invoice-m-summary__item'}>Subtotal</div>
                <div className={'invoice-m-summary__item invoice-m-summary__bold'}>922 USD</div>
            </div>
            <div className={'invoice-m-summary__row invoice-m-summary__row__big'}>
                <div className={'invoice-m-summary__item'}>VAT (10%)</div>
                <div className={'invoice-m-summary__item invoice-m-summary__bold'}>92.2 USD</div>
            </div>
            <div className={'invoice-m-summary__row invoice-m-summary__row__big'}>
                <div className={'invoice-m-summary__item'}>Discounts</div>
                <div className={'invoice-m-summary__item invoice-m-summary__bold'}>0 USD</div>
            </div>
            <div className={'invoice-m-summary__hr'}/>
            <div className={'invoice-m-summary__row invoice-m-summary__row__big'}>
                <div className={'invoice-m-summary__item invoice-m-summary__bold'}>Total Payable</div>
                <div className={'invoice-m-summary__item invoice-m-summary__bold'}>922 USD</div>
            </div>
        </Styles>
    );
};

export default InvoiceMobileSummary;
