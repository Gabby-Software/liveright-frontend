import React, {useState, useEffect} from 'react';
import Styles from './financials-overview.styles';
import {FormSelectUI} from "../../../../components/forms/form-select/form-select.component";
import {statisticRange, statisticRangeOptions} from "../../../../enums/financials.enum";
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import {asMoney} from "../../../../pipes/as-money.pipe";
import FinancialsOverviewLabel from "./components/financials-overview-label/financials-overview-label.component";
import Card from "../../../../components/card/card.style";

type Props = {};
const FinancialsOverview = ({}:Props) => {
    const [range, setRange] = useState<string>(statisticRange.MONTH);
    const {t} = useTranslation();
    return (
        <Styles>
            <div className={'f-overview__range'}>
                <FormSelectUI name={'range'} label={'Select Range'}
                              options={statisticRangeOptions} value={range} onUpdate={setRange}/>
            </div>
            <Card className={'f-overview__graph'}>
                <div className={'f-overview__graph__left'}>
                    <h2 className={'f-overview__graph__title'}>{t('financials:overview.title')}</h2>
                    <div className={'f-overview__graph__body'}/>
                </div>
                <div className={'f-overview__graph__right'}>
                    <FinancialsOverviewLabel
                        label={t('financials:overview.current')}
                        value={45000}
                        currency={'AED'}
                    />
                    <FinancialsOverviewLabel
                        label={t('financials:overview.goal')}
                        value={55000}
                        currency={'AED'}
                    />
                </div>
            </Card>
        </Styles>
    )
};

export default FinancialsOverview;
