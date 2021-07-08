import styled from "styled-components";
import React from "react";

export default (c: React.ComponentType<any>) => styled(c)`
    width: 40px;
    height: 40px;
    padding: 10px;
    border-radius: ${p => p.theme.vars.sizes.borderRadius};
    background-color: ${p => p.theme.vars.colors[p.color] || p.theme.vars.colors.primary};
    color: white;
    margin: 6px 3px;
    cursor: pointer;
    translations: ${p => p.theme.vars.defaults.transition};
    &:hover {
        background-color: ${p => p.theme.vars.colors[p.color+'Light'] || p.theme.vars.colors.primaryLight};
    }
`
