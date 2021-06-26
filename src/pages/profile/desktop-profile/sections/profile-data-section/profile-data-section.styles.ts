import styled from "styled-components";

export default styled.section`
    display:block;
    .profile-data {
        &__cta {
            margin:  0 0 6px auto;
            width: auto;
            +.profile-data__cta {
                margin:  0 0 6px 14px;
            }
        }
        &__cont {
            display: flex;
            flex-wrap:wrap;
        }
    }
`;
