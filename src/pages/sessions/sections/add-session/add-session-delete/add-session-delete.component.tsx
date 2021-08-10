import React, {useCallback} from 'react';
import Styles from './add-session-delete.styles';
import {useTranslation} from "../../../../../modules/i18n/i18n.hook";

const AddSessionDelete: React.FC = () => {
    const {t} = useTranslation();

    const handleDelete = useCallback(() => {
        //todo: handle deletion
    }, []);

    return <Styles onClick={handleDelete}>{t('sessions:delete')}</Styles>
};

export default AddSessionDelete;
