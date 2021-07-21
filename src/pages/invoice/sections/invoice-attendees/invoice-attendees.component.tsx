import React, {useState, useEffect} from 'react';
import Styles from './invoice-attendees.styles';
import FormButton from "../../../../components/forms/form-button/form-button.component";
import {ReactComponent as PrintIcon} from "../../../../assets/media/icons/print.svg";
import {ReactComponent as DownloadIcon} from "../../../../assets/media/icons/download.svg";
import {ReactComponent as MessagesIcon} from "../../../../assets/media/icons/messages.svg";
import moment from 'moment';
import {Routes} from "../../../../enums/routes.enum";
import {Link} from "react-router-dom";

const InvoiceAttendees = () => {
    return (
        <Styles>
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
            <div className={'invoice-att__actions'}>
                <FormButton type={'primary'} className={'invoice-att__status'}>Overdue</FormButton>
                <FormButton type={'primary'} className={'invoice-att__cta'}>Pay Invoice</FormButton>
                <div className={'invoice-att__icons'}>
                    <PrintIcon className={'invoice-att__action'} onClick={window.print}/>
                    <DownloadIcon className={'invoice-att__action'}/>
                    <Link to={Routes.CHAT}><MessagesIcon className={'invoice-att__action'}/></Link>
                </div>
            </div>
            <div className={'invoice-att__print'}>
                <FormButton type={'primary'} className={'invoice-att__status'}>Overdue</FormButton>
                <div className={'invoice-att__date'}><i>{`as of ${moment().format('DD-MM-YYYY')}`}</i></div>
            </div>
        </Styles>
    );
};

export default InvoiceAttendees;
