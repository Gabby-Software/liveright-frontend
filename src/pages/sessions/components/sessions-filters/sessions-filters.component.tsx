import React, {useEffect, useState} from 'react';

import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import {FormInputLabeledUI} from "../../../../components/forms/form-input-labeled/form-input-labeled.component";
import {FormSelectUI} from "../../../../components/forms/form-select/form-select.component";
import {sessionTypeOptions} from "../../../../enums/session-filters.enum";
import {Session, SessionFilter} from "../../../../types/session.type";
import {useIsMobile} from "../../../../hooks/is-mobile.hook";
import Styles from './sessions-filters.styles';

interface Props {
    onUpdate: (filter: SessionFilter) => void;
}

const SessionsFilters: React.FC<Props> = (props) => {
    const {onUpdate} = props;
    const {t} = useTranslation();
    const isMobile = useIsMobile();
    const [date, setDate] = useState('');
    const [type, setType] = useState('All');

    const handleUpdateFilters = () => {
        const result: Pick<SessionFilter, 'type' | 'date'> = {}

        if (type !== 'All') {
            result.type = type;
        }

        if (date.trim()) {
            const isDate = /^\d{4}-\d{2}-\d{2}$/.test(date)

            if (isDate) {
                result.date = date;
            } else if (type === 'All' && (date as Session)) {
                result.type = date;
            }
        }

        onUpdate(result);
    };

    const handleInputBlur = () => {
        handleUpdateFilters()
    };

    useEffect(() => {
        handleUpdateFilters()
    }, [type])

    return (
        <Styles row={!isMobile}>
            <FormInputLabeledUI
                name="dateType"
                placeholder="For example 2021-12-31"
                label={t('sessions:filter-input')}
                value={date}
                onUpdate={setDate}
                onBlur={handleInputBlur}
            />
            <FormSelectUI
                name="type"
                value={type}
                label={t('sessions:type')}
                options={sessionTypeOptions}
                onUpdate={setType}
            />
        </Styles>
    );
};

export default SessionsFilters;
