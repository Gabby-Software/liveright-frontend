import React, {useState, useEffect} from 'react';
import Styles from './create-invoice-client-card.styles';
import {AccountObjType} from "../../../../types/account.type";
import {ReactComponent as TimesIcon} from "../../../../assets/media/icons/times.svg";
import {noImage} from "../../../../pipes/no-image.pipe";

type Props = {
    client: AccountObjType;
    onRemove: () => void;
};
const CreateInvoiceClientCard = ({client, onRemove}:Props) => {
    return (
        <Styles>
            <div className={'ci-cc__left'}>
                {
                    client.avatar?(
                        <img alt={'profile'} className={'ci-cc__img'} src={client.avatar.url}/>
                    ):(
                        <div className={'ci-cc__img'}>{noImage(client.first_name, client.last_name)}</div>
                    )
                }
            </div>
            <div className={'ci-cc__right'}>
                <div className={'ci-cc__name'}>{client.first_name} {client.last_name}</div>
                <div className={'ci-cc__email'}>{client.email}</div>
            </div>
            <TimesIcon className={'ci-cc__times'} onClick={onRemove}/>
        </Styles>
    );
};

export default CreateInvoiceClientCard;
