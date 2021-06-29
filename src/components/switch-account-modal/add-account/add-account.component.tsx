import React, {useContext} from 'react';
import Styles from './add-account.styles';
import Card from "../../card/card.style";
import SwitchAccountModalContext from "../switch-account-modal.context";
import AccountActions from "../../../enums/account-actions.enum";

const types: string[] = ['Trainer','Client'];
const AddAccount = () => {
    const {onClose, setState} = useContext(SwitchAccountModalContext);
    return (
        <Styles>
            {
                types.map(type => (
                    <Card className={'add-account__type'} onClick={() => {
                        onClose();
                        setState(AccountActions.SWITCH_ACCOUNT);
                    }}>{type}</Card>
                ))
            }
        </Styles>
    );
};

export default AddAccount;
