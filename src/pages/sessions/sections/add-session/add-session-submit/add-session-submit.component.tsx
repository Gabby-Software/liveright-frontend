import React from 'react';
import {useFormikContext} from "formik";
import Styles from './add-session-submit.styles';
import FormButton from "../../../../../components/forms/form-button/form-button.component";
import {classes} from "../../../../../pipes/classes.pipe";
import {useTranslation} from "../../../../../modules/i18n/i18n.hook";
import {SessionType} from "../../../../../types/session.type";
import {AddSessionFormType} from "../add-session-form/add-session-form.component";

interface Props {
    session?: SessionType;
}

const AddSessionSubmit: React.FC<Props> = (props) => {
    const {session} = props;
    const {t} = useTranslation();
    const {values, isSubmitting} = useFormikContext<AddSessionFormType>();
    const {isBusy} = values;

    return (
        <React.Fragment>
            {isBusy ? (
                <Styles>
                    {t('sessions:collapse')}
                </Styles>
            ) : null}
            <FormButton
                className={classes('button-submit', 'add-session__form__submit')}
                type={'primary'}
                htmlType={'submit'}
                loading={isSubmitting}
                disabled={isSubmitting}
            >
                {session
                    ? t('sessions:save')
                    : isBusy
                        ? t('sessions:submit-anyway')
                        : t('sessions:submit')
                }
            </FormButton>
        </React.Fragment>
    );
};

export default AddSessionSubmit;
