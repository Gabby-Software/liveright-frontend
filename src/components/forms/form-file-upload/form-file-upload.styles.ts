import styled from 'styled-components'

export default styled.div`
width: 247px;
.file_input {
    
    
    &__add{
        cursor: pointer;
        height: 70px;
        background-color: ${(p) => p.theme.vars.colors.card};
        border-radius:${(p) => p.theme.vars.sizes.borderRadius};
        ${(p) => p.theme.mixin.dashedBorder(p.theme.vars.colors.secondary2)}
        ${(p) => p.theme.extend.flexCenter}
        font-weight: 500;
        font-size: 14px;
        color: ${(p) => p.theme.vars.colors.labelLight};
        svg {
            color: ${(p) => p.theme.vars.colors.secondary2};
        }
    }
    &__accept {
        font-size: 10px;
        color: ${(p) => p.theme.vars.colors.labelLighht};
    }
    &__bottom {
        display: flex;
        justify-content: space-between;
        align-items:center;
        padding-top:4px;
    }
    &__filename {
        font-weight: 600;
        font-size: 14px;
        display: inline;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding-right 8px;
    }
    &__delete {
        color: ${(p) => p.theme.vars.colors.primary};
        font-weight: 500;
        font-size: 12px;
        cursor: pointer;
    }
    &__label {
        color: ${(p) => p.theme.vars.colors.primaryDark};
        transition: ${(p) => p.theme.vars.defaults.transition};
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 8px;
        text-align: left;
    }
}
`
