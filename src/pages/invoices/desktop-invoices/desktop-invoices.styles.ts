import styled from 'styled-components'

export default styled.div`
    padding: 40px;
    display: flex;
    overflow: auto;
    .select_input__wrapper {
        max-width: 260px;
    }
    .invoices {
        &__data {
            width: 100%;
            max-width: 920px;
            margin: auto;
        }
        &__view {
            margin:  0 0 auto 40px;
            transition: ${(p) => p.theme.vars.defaults.transition};
            width: 0;
            overflow: hidden;
            flex-shrink:0;
            margin-top: 35px;
            &__card {
                width: 432px;    
            }
            &__open {
                width: 432px;
            }
        }
        &__close, &__download {
            margin: 24px 8px;
            cursor:pointer;
            height: 14px;
            width: auto;
            color: ${(p) => p.theme.vars.colors.primaryDark};
        }
        &__filter {
            max-width: 242px;
            flex-shrink:2;
        }
        &__filters {
            margin-bottom: 24px;
        }
    
`
