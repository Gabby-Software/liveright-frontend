import styled from 'styled-components'

import { getColor, getColorCarry } from '../../../../pipes/theme-color.pipe'

export const ProgressCardStyles = styled.div<any>`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: ${(props) => props.theme.vars.colors.primaryDark_v2};
  overflow: hidden;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }

  & .progress-card__content {
    padding: 1.125rem 1.25rem;
    display: flex;
    flex-direction: column;
  }

  & .progress-card__preview {
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${getColorCarry('primaryDark2_v2')};
    padding-bottom: 0.75rem;
  }

  & .progress-card__badge {
    width: 54px;
    height: 54px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${getColorCarry('primaryDark2_v2')};
    border-radius: 9999px;
    color: #fff;
  }

  & .progress-card__title-container {
    flex: 1;
  }

  & .progress-card__title {
    color: #fff;
    opacity: 0.8;
    font-size: 1rem;
  }

  & .progress-card__target-container {
    display: flex;
    align-items: center;
  }

  & .progress-card__progress {
    color: ${(props) => getColor(props, props.off ? 'red_60' : 'green_80')};

    span {
      font-size: 1.375rem;
      font-weight: 700;
    }
  }

  & .progress-card__target-label {
    color: ${getColorCarry('neutral_50')};
    font-size: 0.75rem;
    padding: 0 0.75rem;
  }

  & .progress-card__progress-values {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 1rem;
  }

  & .progress-card__progress-value {
    color: ${getColorCarry('neutral_50')};
    font-size: 0.75rem;

    & span {
      color: #fff;
      padding-left: 0.5rem;
    }
  }

  & .progress-card__bar {
    display: flex;
    align-items: center;
    height: 39px;
    background-color: ${(props) =>
      getColor(props, props.off ? 'red_100' : 'green_90')};
    position: relative;

    &::before {
      content: '';
      display: block;
      position: absolute;
      width: ${(props) => props.progress}%;
      height: 100%;
      background-color: ${(props) =>
        getColor(props, props.off ? 'primary_v2' : 'green_80')};
    }
  }

  & .progress-card__bar-hint {
    position: absolute;
    left: 0;
    color: #fff;
    font-size: 0.75rem;
    padding: 0 1.25rem;

    & span {
      font-size: 0.625rem;
      opacity: 0.8;
    }
  }
`
