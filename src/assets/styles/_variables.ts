const vars = {
  colors: {
    primary: '#ED1731',
    primaryLight: '#ed4452',
    primaryDarken: '#d6142d',
    primaryDark: '#40424D',
    secondary: '#BDBDBD',
    secondary2: '#d5d5d5',
    secondary3: '#818799',
    dark: '#5A5A5A',
    dark2: '#39393d',
    light: '#EBEBEB',
    light2: '#a8a8a8',
    card: '#f9f9f9',
    labelLight: '#72727a',
    inputBorder: '#dfdfdf',
    background: '#fafafa',
    error: '#ED1731',
    success: '#56EC53',
    successDark: '#43b840',
    info: '#2F86EC',
    warning: '#FC7D08',
    warningDark: '#c46106',

    // V2
    primary_v2: '#EF1733',
    background_v2: '#F1F4F7',
    primaryDark_v2: '#2E2F31',
    primaryDark2_v2: '#404040',
    dark_v2: '#757575',
    secondary1_v2: '#E4E8ED',
    secondary2_v2: '#9E9E9E',
    secondary3_v2: '#F8F8F8',
    secondary4_v2: '#5E5E5E',
    secondary5_v2: '#A1ADB9',
    secondary6_v2: '#8A95A7',
    secondary7_v2: '#A7B8D2',
    secondary8_v2: '#D0D9E8',
    inputBorder_v2: '#E0E0E0',
    link: '#2E81ED',
    link_lighten: '#82B8FA',
    link_darken: '#2871d0',
    link_bg: '#EBF4FF',
    chat_blue: '#DFE6F1',
    chat_dark: '#404040',
    orange: '#E48713',
    orange_90: '#FF9900',
    blue_20: '#D0E6FE',
    blue_50: '#549BF5',
    blue_70: '#1268E4',
    blue_80: '#0053D7',
    neutral_10: '#FAFAFA',
    neutral_50: '#C2C2C2',
    red: '#EF1733',
    red_10: '#FFEBEB',
    red_40: '#FA8284',
    red_60: '#ED2E32',
    red_70: '#E41216',
    red_80: '#D70004',
    red_100: '#870002',
    green_10: '#F2FFF2',
    green_20: '#D7FED6',
    green_90: '#00B334',
    green_80: '#00D721',
    yellow_20: '#FEFAD0',
    yellow_80: '#EDD92E',
    orange_100: '#FF6B2C',
    orange_60: '#ED9C30',
    orange_20: '#FEEED6'
  },
  sizes: {
    borderRadius: '10px',
    boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.15)',
    space: '8px'
  },
  zIndex: {
    header: 40,
    footer: 40,
    chatPopup: 50,
    quickAccess: 55,
    modal: 60,
    toast: 1001
  },
  media: {
    desktop: 1200,
    tablet: 720,
    mobile: 540
  },
  defaults: {
    transition: 'all .3s ease',
    font: "'Circular Std', sans-serif"
  },
  shadows: {
    primary: '0px 4px 20px rgba(74, 74, 74, 0.13)',
    secondary: '0px 0px 40px rgba(230, 45, 71, 0.03)'
  }
}

export const colors = vars.colors
export type VarsType = typeof vars
export default vars
