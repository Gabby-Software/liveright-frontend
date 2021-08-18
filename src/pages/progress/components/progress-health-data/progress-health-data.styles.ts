import styled from "styled-components";
import {Button, Space} from "antd";

import Card from "../../../../components/card/card.style";

export const Wrapper = styled.div`  
  .select_input__wrapper {
    width: 250px;
  }
`;

export const CardsWrapper = styled(Space)`
  margin-bottom: 32px;
  padding: 8px;
`;

export const FilterWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;
`;

export const SwitchViewButton = styled(Button)`
`;

export const TableWrapper = styled(Card)`
  margin-bottom: 32px;
`;

