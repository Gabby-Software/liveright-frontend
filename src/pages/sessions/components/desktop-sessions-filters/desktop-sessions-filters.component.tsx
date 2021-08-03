import React from 'react';
import Styles from './desktop-sessions-filters.styles';
import {Formik, Form} from "formik";
import FormRow from "../../../../components/forms/form-row/form-row.component";
import FormSelect from "../../../../components/forms/form-select/form-select.component";
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import {sessionTypeOptions} from "../../../../enums/session-filters.enum";
import FormInput from "../../../../components/forms/form-input/form-input.component";
import {FilterValues} from "../../../../types/sessions-filter.type";
import AddSession from "../../sections/add-session/add-session.component";

const initialValues: FilterValues = {
    dateType: '',
    type: 'All',
}

interface Props {
    onChange: (values: FilterValues) => void
}

const DesktopSessionsFilters: React.FC<Props> = (props) => {
    const {onChange} = props;
    const {t} = useTranslation();

    return (
        <Styles>
            <Formik
                initialValues={initialValues}
                onSubmit={() => {}}
                validate={onChange}
            >
                <Form>
                    <FormRow>
                        <FormInput name="dateType" label={t('sessions:filter-input')} />
                        <FormSelect
                            name={'type'}
                            label={t('sessions:type')}
                            options={sessionTypeOptions}
                        />
                    </FormRow>
                </Form>
            </Formik>
            {/*<SessionAddModal isOpen={addOpen} onClose={() => setAddOpen(false)}/>*/}
            {/*<AddSession isOpen={addOpen} onClose={() => setAddOpen(false)}/>*/}
        </Styles>
    );
};

export default DesktopSessionsFilters;
