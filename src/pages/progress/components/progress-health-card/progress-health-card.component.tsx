import React, {ReactElement} from 'react';

import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import {StyledCard, Quality, Data, Button} from "./progress-health-card.styles";

interface Props {
  icon: ReactElement;
  quality?: string;
  data?: string;
}

const HealthCard: React.FC<Props> = (props) => {
  const {icon, quality, data} = props;
  const {t} = useTranslation();

  return (
      <StyledCard noLogs={!data}>
        {icon}
        {data ? (
            <React.Fragment>
              <Quality>{t(`progress:quality.${quality}`)}</Quality>
              <Data>{data}</Data>
            </React.Fragment>
        ) : (
            <React.Fragment>
              <Data>{t("progress:noLogs")}</Data>
              <Button type="primary">{t("progress:logNow")}</Button>
            </React.Fragment>
        )}
      </StyledCard>
  )
};

export default HealthCard;
