import React, {useState, useEffect, useContext} from 'react';
import Styles, {Wrapper, Logo, SwitchState, Title} from '../styles';
import logoCompact from "../../../assets/media/logo-compact.png";
import {useTranslation} from "../../../modules/i18n/i18n.hook";
import {useDispatch} from "react-redux";
import logger from "../../../managers/logger.manager";
import {toast} from "../../../components/toast/toast.component";
import Steps from "../../../components/steps/steps.component";
import {onlyAuth} from "../../../guards/auth.guard";
import {onlyActive} from "../../../guards/active.guard";
import Onboard1 from "./steps/onboard-1/onboard-1.component";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import {AuthOnboardType} from "../../../modules/auth/auth-onboard.type";
import {Redirect} from "react-router";
import ButtonSubmit from "../../../components/forms/button-submit/button-submit.component";
import FormButton from "../../../components/forms/form-button/form-button.component";
import {Link} from "react-router-dom";
import {Routes} from "../../../enums/routes.enum";
import Onboard2 from "./steps/onboard-2/onboard-2.component";
import Onboard3 from "./steps/onboard-3/onboard-3.component";

const initialState: AuthOnboardType = {
    phone: '',
    birthday: '',
    address: '',
    dietary_restrictions: '',
    injuries: ''
};
const SignUpOnboard = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const [currentStep, setCurrentStep] = useState(0);
    const handleSubmit = (form: AuthOnboardType, submitProps: { setSubmitting: (submitting: boolean) => void }) => {
        logger.info('SIGN_UP_ONBOARD', 'submitting..', form);
        switch (currentStep) {
            case 0:
                //todo: update data
                setCurrentStep(1);
                break;
            case 1:
                //todo: update data
                setCurrentStep(2);
                break;
            case 2:
                //todo: update data
                setCurrentStep(3);
                toast.show({type: 'success', msg: t('alerts:onboard-success')});
                break;

        }
        submitProps.setSubmitting(false);
        // toast.show({type: 'success', msg: 'You successfully onboarded!'});

    };
    if(currentStep > 2)
        return <Redirect to={Routes.HOME}/>;
    return (
        <Styles>
            <Wrapper>
                <Logo alt={'liveright'} src={logoCompact}/>
                <Title>
                    <div className={'title__hr'}/>
                    <h1 className={'title__h1'}>{t(`auth:sign-up-onboard-${currentStep}-title`)}{' '}{currentStep===0?'Donatello,':null}</h1>
                    <h2 className={'title__h2'}>{t(`auth:sign-up-onboard-${currentStep}-desc`)}</h2>
                </Title>
                <Formik initialValues={initialState}
                        onSubmit={handleSubmit}
                        validationSchema={Yup.object({
                            phone: Yup.string().phone()
                        })}
                >
                    {() => (
                        <Form>
                            <Steps currentStep={currentStep}>
                                <Steps.Step>
                                    <Onboard1/>
                                </Steps.Step>
                                <Steps.Step>
                                    <Onboard2/>
                                </Steps.Step>
                                <Steps.Step>
                                    <Onboard3/>
                                </Steps.Step>
                            </Steps>
                            <ButtonSubmit>{t('finish')}</ButtonSubmit>
                            <FormButton className={'sign-up__skip'} type={'link'}>
                                <Link to={Routes.HOME}>{t('skip')}</Link>
                            </FormButton>
                        </Form>
                    )}
                </Formik>
            </Wrapper>
        </Styles>
    )
};

export default onlyAuth(onlyActive(SignUpOnboard));
