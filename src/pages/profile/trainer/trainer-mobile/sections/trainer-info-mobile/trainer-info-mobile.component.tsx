import React from 'react';
import Styles from './trainer-info-mobile.styles';
import {useTranslation} from "../../../../../../modules/i18n/i18n.hook";
import {OptionType} from "../../../../../../types/option.type";
import Accordion from "../../../../../../components/accordion/accordion.component";
import {useTrainer} from "../../../../../../hooks/trainer.hook";

const TrainerInfoMobile = () => {
    const {about, qualifications, additional_information} = useTrainer();
    const {t} = useTranslation();
    const items: OptionType[] = [
        {label: t('profile:about'), value: about},
        {label: t('profile:qualifications'), value: qualifications},
        {label: t('profile:additional-information'), value: additional_information},
    ];
    return (
        <Styles>
            <Accordion>
                {
                    items.filter(v => !!v).map(({label, value}) => (
                        <Accordion.Item title={label}>
                            {value || t('no-data')}
                        </Accordion.Item>
                    ))
                }
            </Accordion>
        </Styles>
    )
};

export default TrainerInfoMobile;
