import styled from "styled-components";

export default styled.div`
    
    .calendar-month {
        &__week {
            ${p => p.theme.extend.flexCenter}
        }
        &__cont {
            margin: 24px;   
            width: calc(100% - 48px);
            overflow: auto; 
        }
    }
    
`;
