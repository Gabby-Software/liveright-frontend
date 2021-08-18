import React, {useState} from 'react';

import {useTitleContent} from "../../../layouts/desktop-layout/desktop-layout.component";
import TitleButton from "../components/progress-title-button/progress-title-button.component";
import {useTranslation} from "../../../modules/i18n/i18n.hook";
import Tabs from "../../../components/tabs/tabs.component";
import HealthData from "../components/progress-health-data/progress-health-data.component";
import {PROGRESS_SECTIONS} from "../progress.constants";
import {Wrapper} from "./progress-desktop.styles";
import {ProgressSectionsType} from "../progress.types";

const ProgressDesktop = () => {
    const {t} = useTranslation();
    const [activeTab, setActiveTab] = useState<ProgressSectionsType>('healthData');

    useTitleContent((
        <TitleButton onMenuClick={setActiveTab} />
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
                activeKey={activeTab}
                onChange={(key) => setActiveTab(key as ProgressSectionsType)}
                tabs={[
                    {
                      label: t('progress:sections.healthData'),
                      renderContent: renderHealthData,
                      key: PROGRESS_SECTIONS.HEALTH_DATA
                    },
                    {
                      label: t('progress:sections.measurements'),
                      renderContent: renderMeasurements,
                      key: PROGRESS_SECTIONS.MEASUREMENTS
                    },
                ]}
            />
        </Wrapper>
    )
};

export default ProgressDesktop;
