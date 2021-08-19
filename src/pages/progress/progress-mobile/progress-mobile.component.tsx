import React, {useState} from 'react';

import {useTranslation} from "../../../modules/i18n/i18n.hook";
import TitleButton from "../components/progress-title-button/progress-title-button.component";
import HealthData from "../components/progress-health-data/progress-health-data.component";
import {ProgressSectionsType} from "../progress.types";
import {PROGRESS_SECTIONS} from "../progress.constants";
import {StyledTabs, Wrapper} from "./progress-mobile.styles";

const ProgressMobile = () => {
    const {t} = useTranslation();
    const [activeTab, setActiveTab] = useState<ProgressSectionsType>('healthData');

    const renderHealthData = () => {
        return <HealthData />
    };

    const renderMeasurements = () => {
        return <div>123</div>
    };

    return (
        <Wrapper>
            <TitleButton onMenuClick={setActiveTab} />
            <StyledTabs
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

export default ProgressMobile;
