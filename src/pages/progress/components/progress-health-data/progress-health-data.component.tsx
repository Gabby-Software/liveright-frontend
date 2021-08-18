import React, {useMemo, useState} from 'react';

import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import PageSubtitle from "../../../../components/titles/page-subtitle.styles";
import HealthCard from "../progress-health-card/progress-health-card.component";
import {ReactComponent as SleepIcon} from "../../../../assets/media/icons/sleep.svg";
import {ReactComponent as CardiogramIcon} from "../../../../assets/media/icons/cardiogram.svg";
import {ReactComponent as StepsIcon} from "../../../../assets/media/icons/steps.svg";
import {ReactComponent as BloodIcon} from "../../../../assets/media/icons/blood.svg";
import Tabs from "../../../../components/tabs/tabs.component";
import HealthTable from "../progress-table/progress-table.component";
import {OverTimeType} from "../../progress.types";
import {OVER_TIME} from "../../progress.constants";
import {FormSelectUI} from "../../../../components/forms/form-select/form-select.component";
import {Wrapper, CardsWrapper, FilterWrapper, TableWrapper, SwitchViewButton} from "./progress-health-data.styles";
import HealthChart from "../progress-chart/progress-chart.component";

interface Props {
}

const HealthData: React.FC<Props> = (props) => {
  const {t} = useTranslation();
  const [overTime, setOverTime] = useState<OverTimeType>(OVER_TIME.MONTH);
  const [isGraphView, setIsGraphView] = useState(false);
  const overTimeOptions = useMemo(() => [
    {label: t(`progress:${OVER_TIME.WEEK}`), value: OVER_TIME.WEEK},
    {label: t(`progress:${OVER_TIME.MONTH}`), value: OVER_TIME.MONTH},
    {label: t(`progress:${OVER_TIME.QUARTER}`), value: OVER_TIME.QUARTER},
    {label: t(`progress:${OVER_TIME.YTD}`), value: OVER_TIME.YTD},
    {label: t(`progress:${OVER_TIME.LAST_YEAR}`), value: OVER_TIME.LAST_YEAR},
    {label: t(`progress:${OVER_TIME.SPECIFIC}`), value: OVER_TIME.SPECIFIC},
  ], [])

  const handleSwitchViewClick = () => {
    setIsGraphView(!isGraphView)
  }

  const renderDataTable = () => () => {
    return isGraphView ? <HealthChart /> : <HealthTable />
  }

  return (
      <Wrapper>
        <PageSubtitle>{t('progress:todayHighlights')}</PageSubtitle>
        <CardsWrapper size="middle">
          <HealthCard
              icon={<SleepIcon />}
              data="From 22:10 to 07:00"
              quality="good"
          />
          <HealthCard
              icon={<CardiogramIcon />}
              data="80"
              quality="good"
          />
          <HealthCard
              icon={<StepsIcon />}
          />
          <HealthCard
              icon={<BloodIcon />}
          />
        </CardsWrapper>
        <PageSubtitle>{t('progress:overTime')}</PageSubtitle>
        <FilterWrapper>
          <FormSelectUI
              name="overTime"
              value={overTime}
              label=""
              options={overTimeOptions}
              onUpdate={(value) => setOverTime(value as OverTimeType)}
          />
          <SwitchViewButton onClick={handleSwitchViewClick} type="link">
            {isGraphView ? t('progress:seeTable') : t('progress:seeGraph')}
          </SwitchViewButton>
        </FilterWrapper>
        <TableWrapper>
          <Tabs
              tabPosition="left"
              tabs={[
                {label: t('progress:sleep'), renderContent: renderDataTable()},
                {label: t('progress:heartRate'), renderContent: renderDataTable()},
                {label: t('progress:steps'), renderContent: renderDataTable()},
                {label: t('progress:bloodGlicose'), renderContent: renderDataTable()},
              ]}
          />
        </TableWrapper>
        <PageSubtitle>{t('progress:average')}</PageSubtitle>
        <CardsWrapper size="middle">
          <HealthCard
              icon={<SleepIcon />}
              data="From 22:10 to 07:00"
              quality="good"
          />
          <HealthCard
              icon={<CardiogramIcon />}
              data="80"
              quality="good"
          />
        </CardsWrapper>
      </Wrapper>
  )
};

export default HealthData;
