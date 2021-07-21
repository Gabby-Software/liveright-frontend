import React, {useState, useEffect} from 'react';
import Styles from './invoice-mobile-details.styles';
import Accordion, {ItemPropsType} from "../../../../components/accordion/accordion.component";

type Props = {};
const InvoiceMobileDetails = ({}:Props) => {
    const Item =  ({open, switchOpen, children }: {open?: boolean; switchOpen?: () => void;children: React.ReactNode}) => (
        <Accordion.Item open={open} switchOpen={switchOpen} title={open?'Hide Invoice Details':'See Invoice Details'}>
            {children}
        </Accordion.Item>
    );
    return (
        <Styles>
            <Accordion>
                <Item>
                    <div className={'invoice-att'}>
                        <div className={'invoice-att__title'}>Issued by</div>
                        <div className={'invoice-att__name'}>{'Jhon Trainer'}</div>
                        <div
                            className={'invoice-att__desc'}>{'Avenuue of Energy, 234 1234 Dubai DMC United Arab Emirates'}</div>
                    </div>
                    <div className={'invoice-att'}>
                        <div className={'invoice-att__title'}>Issued to</div>
                        <div className={'invoice-att__name'}>{'Paul The Trainee'}</div>
                        <div
                            className={'invoice-att__desc'}>{'Avenuue of Energy, 234 1234 Dubai DMC United Arab Emirates'}</div>
                    </div>
                </Item>
            </Accordion>
        </Styles>
    )
};

export default InvoiceMobileDetails;
