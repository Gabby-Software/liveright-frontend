import styled from "styled-components";
import React from "react";

export default (c: React.ComponentType<any>) => styled(c)`
    width: 40px;
    height: 40px;
    padding: 10px;
    border-radius: ${p => p.theme.vars.sizes.borderRadius};
    background-color: ${p => p.theme.vars.colors.card};
    color: ${p => p.theme.vars.colors.secondary3};
    margin: 6px 3px;
    cursor: pointer;
    transition: ${p => p.theme.vars.defaults.transition};
    &:hover {
        background-color: ${p => p.theme.vars.colors.light};
    }
`
