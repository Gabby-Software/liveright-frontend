import styled from 'styled-components'

import { media } from '../../../../../assets/styles/_media'
import { getColorCarry } from '../../../../../pipes/theme-color.pipe'

export default styled.div<any>`
  ${(p) => p.theme.extend.flexCenter}
  padding: 6px 12px;
  width: 292px;
  max-width: 100%;

  * {
    outline: none;
  }

  ${media('tablet', 'max')`
    width: 240px;
  `}

  .rhap_container {
    background-color: transparent;
    box-shadow: none;
    padding: 0.5rem 0;
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
  }

  .rhap_horizontal {
    width: 100%;
    display: flex;
    align-items: center;
  }

  .rhap_horizontal .rhap_controls-section {
    position: absolute;
    width: fit-content;
    margin-left: 0;
    left: 45px;
  }

  .rhap_progress-container {
    //padding-left: 3rem;
  }

  .rhap_progress-bar {
    height: 2px;
    background-color: #fff;
    display: flex;
    align-items: center;
  }

  .rhap_progress-filled {
    background-color: ${getColorCarry('blue_50')};
    box-shadow: none;
  }

  .rhap_progress-indicator {
    width: 9px;
    height: 9px;
    background-color: ${getColorCarry('blue_40')};
    box-shadow: none;
    top: unset;
    margin-left: -4px;
  }

  .rhap_button-clear {
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${getColorCarry('link')};
    width: 20px;
    height: 20px;
    overflow: hidden;

    & svg:not(.chat-audio__pause) {
      min-width: 25px;
      min-height: 25px;
    }
  }

  .rhap_time {
    color: ${(props) => (props.$me ? '#C2C2C2' : '#8FA1BC')};
    font-size: 0.75rem;
    font-weight: 400;
    margin-right: 1.5rem;
    padding-right: 0.5rem;
    position: relative;
    display: flex;
    align-items: center;
    min-width: 42px;

    &::after {
      content: '';
      display: block;
      width: 1px;
      height: 30px;
      position: absolute;
      right: 0;
      background-color: ${(props) => (props.$me ? '#5E5E5E' : '#D0D9E8')};
    }
  }
`
