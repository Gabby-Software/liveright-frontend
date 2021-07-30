import React, {useState, useEffect, useCallback} from 'react';
import Styles from './add-session-delete.styles';
import {useTranslation} from "../../../../../modules/i18n/i18n.hook";

type Props = {forEdit?:boolean};
const AddSessionDelete = ({forEdit}:Props) => {
    const {t} = useTranslation();
    const handleDelete = useCallback(() => {
        //todo: handle deletion
    }, []);
    if(!forEdit) return null;
    return <Styles onClick={handleDelete}>{t('sessions:delete')}</Styles>
};

export default AddSessionDelete;
