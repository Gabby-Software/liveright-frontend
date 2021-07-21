import React, {useState, useEffect} from 'react';
import Styles from './invoice-mobile-summary.styles';
import {useTranslation} from "../../../../modules/i18n/i18n.hook";

const InvoiceMobileSummary = () => {
    const {t} = useTranslation();
    return (
        <Styles className={'invoice-m-summary'}>
            <div className={'invoice-m-summary__row'}>
                <div className={'invoice-m-summary__item invoice-m-summary__bold'}>{t('invoices:item')}</div>
                <div className={'invoice-m-summary__item invoice-m-summary__bold'}>{t('invoices:cost')}</div>
            </div>
            <div className={'invoice-m-summary__row'}>
                <div className={'invoice-m-summary__item invoice-m-summary__bold'}>
                    <div className={'invoice-m-summary__item invoice-m-summary__ebold'}>{'Coaching'}</div>
                    <div className={'invoice-m-summary__item'}>{'Consultation for one'}</div>
                </div>
                <div className={'invoice-m-summary__item invoice-m-summary__bold'}>461 USD</div>
            </div>
            <div className={'invoice-m-summary__row invoice-m-summary__row__space'}>
                <div className={'invoice-m-summary__item'}>1 X 461 USD</div>
                <div className={'invoice-m-summary__item'}>(46.1 USD {t('invoices:vat')})</div>
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
                <div className={'invoice-m-summary__item'}>(46.1 USD {t('invoices:vat')})</div>
            </div>
            <div className={'invoice-m-summary__hr'}/>
            <div className={'invoice-m-summary__row invoice-m-summary__row__big'}>
                <div className={'invoice-m-summary__item'}>{t('invoices:subtotal')}</div>
                <div className={'invoice-m-summary__item invoice-m-summary__bold'}>922 USD</div>
            </div>
            <div className={'invoice-m-summary__row invoice-m-summary__row__big'}>
                <div className={'invoice-m-summary__item'}>{t('invoices:vat')} (10%)</div>
                <div className={'invoice-m-summary__item invoice-m-summary__bold'}>92.2 USD</div>
            </div>
            <div className={'invoice-m-summary__row invoice-m-summary__row__big'}>
                <div className={'invoice-m-summary__item'}>{t('invoices:discount')}</div>
                <div className={'invoice-m-summary__item invoice-m-summary__bold'}>0 USD</div>
            </div>
            <div className={'invoice-m-summary__hr'}/>
            <div className={'invoice-m-summary__row invoice-m-summary__row__big'}>
                <div className={'invoice-m-summary__item invoice-m-summary__bold'}>{t('invoices:total')}</div>
                <div className={'invoice-m-summary__item invoice-m-summary__bold'}>922 USD</div>
            </div>
        </Styles>
    );
};

export default InvoiceMobileSummary;
