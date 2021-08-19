import React, {useMemo} from 'react';
import {Dropdown, Menu} from "antd";
import {map} from 'lodash';

import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import {PROGRESS_SECTIONS} from "../../progress.constants";
import {ProgressSectionsType} from "../../progress.types";
import {StyledButton} from "./progress-title-button.styles";

interface Props {
  onMenuClick: (value: ProgressSectionsType) => void;
}

const TitleButton: React.FC<Props> = (props) => {
  const {onMenuClick} = props;
  const {t} = useTranslation();

  const handleMenuClick = ({key}: any) => {
    onMenuClick(key as ProgressSectionsType);
  };

  const menu = useMemo(() => {
    return (
        <Menu onClick={handleMenuClick}>
          {map(PROGRESS_SECTIONS, (it) => (
              <Menu.Item key={it}>
                {t(`progress:sections.${it}`)}
              </Menu.Item>
          ))}
        </Menu>
    )
  }, [])

  return (
      <Dropdown overlay={menu}>
        <StyledButton type="primary">
          {t('progress:sections.log')}
        </StyledButton>
      </Dropdown>
  )
};

export default TitleButton;
