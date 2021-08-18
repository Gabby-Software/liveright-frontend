import React, {useMemo} from 'react';
import {Dropdown, Menu} from "antd";
import {map} from 'lodash';

import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import {PROGRESS_SECTIONS} from "../../progress.constants";
import {StyledButton} from "./progress-title-button.styles";

interface Props {
  onMenuClick: (value: string) => void;
}

const TitleButton: React.FC<Props> = (props) => {
  const {onMenuClick} = props;
  const {t} = useTranslation();

  const handleMenuClick = ({item}: any) => {
    onMenuClick(item as string);
  };

  const menu = useMemo(() => {
    const {LOG, ...menuItems} = PROGRESS_SECTIONS;

    return (
        <Menu onClick={handleMenuClick}>
          {map(menuItems, (it) => (
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
