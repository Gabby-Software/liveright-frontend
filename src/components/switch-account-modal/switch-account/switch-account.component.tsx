import React, {useContext} from 'react';
import Styles from './switch-account.styles';
import Card from "../../card/card.style";
import SwitchAccountModalContext from "../switch-account-modal.context";
import AccountActions from "../../../enums/account-actions.enum";
import profilePlaceholder from "../../../assets/media/profile-placeholder.png";
import {ReactComponent as PlusIcon} from "../../../assets/media/icons/add.svg";
import {toast} from "../../toast/toast.component";
import {useTranslation} from "../../../modules/i18n/i18n.hook";

type AccountType = {
    first_name: string;
    last_name: string;
    type: string;
    image: string;
}
const accounts: AccountType[] = [
    {
        first_name: 'Chris',
        last_name: 'Hemington',
        type: 'trainer',
        image: profilePlaceholder
    },
    {
        first_name: 'Marina',
        last_name: 'Gergel',
        type: 'client',
        image: profilePlaceholder
    },
];
const SwitchAccount = () => {
    const {onClose, setState} = useContext(SwitchAccountModalContext);
    const {t} = useTranslation();
    const activeAccount = 0;
    const switchAccount =  () => {
        onClose();
        toast.show({type: 'success', msg: 'Account switched!'});
    };
    return (
        <Styles>
            {
                accounts.map(acc => (
                    <Card className={'swa-card'} onClick={switchAccount}>
                        <img src={acc.image} alt={'account-image'} className={'swa-card__img'}/>
                        <div className={'swa-card__info'}>
                            <div className={'swa-card__name'}>{acc.first_name} {acc.last_name}</div>
                            <div className={'swa-card__type'}>{acc.type}</div>
                        </div>
                    </Card>
                ))
            }
            <Card className={'swa-card__add'} onClick={() => setState(AccountActions.ADD_ACCOUNT)}>
                <span>{t('menu.add-account')}</span>
            </Card>
        </Styles>
    )
};

export default SwitchAccount;
