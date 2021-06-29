import styled from "styled-components";

export default styled.div`
    width: 50%;
    margin: 70px 0;
    .add-account {
        &__type {
            ${p => p.theme.extend.flexCenter}
            margin-bottom: 14px;
            font-size:18px;
            font-weight: 500;
            height: 75px;   
        }
    }
`;
