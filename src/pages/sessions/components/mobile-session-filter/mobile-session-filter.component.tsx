import React from 'react';
import {Formik, Form} from "formik";
import Styles from './mobile-session-filter.styles';
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import {FilterValues} from "../../../../types/sessions-filter.type";
import {sessionTypeOptions} from "../../../../enums/session-filters.enum";
import FormSelect from "../../../../components/forms/form-select/form-select.component";
import FormInput from "../../../../components/forms/form-input/form-input.component";

const initialValues: FilterValues = {
    dateType: '',
    type: 'All',
}

interface Props {
    onChange: (values: FilterValues) => void
}

const MobileSessionFilter: React.FC<Props> = (props) => {
    const {onChange} = props;
    const {t} = useTranslation();

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={() => {}}
            validate={onChange}
        >
            <Form>
                <Styles>
                    <FormInput name="dateType" label={t("sessions:filter-input")} />
                    <FormSelect
                        name="type"
                        label={t('sessions:type')}
                        options={sessionTypeOptions}
                    />
                </Styles>
            </Form>
        </Formik>
    )
};

export default MobileSessionFilter;
