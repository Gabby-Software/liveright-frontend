import React, {useContext} from 'react';
import Styles from './add-account.styles';
import Card from "../../card/card.style";
import SwitchAccountModalContext from "../switch-account-modal.context";
import AccountActions from "../../../enums/account-actions.enum";
import {toast} from "../../toast/toast.component";

const types: string[] = ['Trainer','Client'];
const AddAccount = () => {
    const {onClose, setState} = useContext(SwitchAccountModalContext);
    const switchAccount = () => {
        onClose();
        setState(AccountActions.SWITCH_ACCOUNT);
        toast.show({type: 'success', msg: 'Account created!'});
    };
    return (
        <Styles>
            {
                types.map(type => (
                    <Card className={'add-account__type'} onClick={switchAccount}>{type}</Card>
                ))
            }
        </Styles>
    );
};

export default AddAccount;
