import React from 'react';

import {useTitleContent} from "../../../layouts/desktop-layout/desktop-layout.component";
import TitleButton from "../components/progress-title-button/progress-title-button.component";
import {useTranslation} from "../../../modules/i18n/i18n.hook";
import Tabs from "../../../components/tabs/tabs.component";
import HealthData from "../components/progress-health-data/progress-health-data.component";
import {Wrapper} from "./progress-desktop.styles";

const ProgressDesktop = () => {
    const {t} = useTranslation();

    useTitleContent((
        <TitleButton onMenuClick={() => {}} />
    ));

    const renderHealthData = () => {
        return <HealthData />
    };

    const renderMeasurements = () => {
        return <div>123</div>
    };

    return (
        <Wrapper>
            <Tabs
              tabs={[
                {label: t('progress:sections.healthData'), renderContent: renderHealthData},
                {label: t('progress:sections.measurements'), renderContent: renderMeasurements},
              ]}
            />
        </Wrapper>
    )
};

export default ProgressDesktop;
