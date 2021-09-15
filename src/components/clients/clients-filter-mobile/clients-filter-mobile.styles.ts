import styled from 'styled-components'

export default styled.div`
  margin: 0 0 0 auto;
  .clients__filter-search {
    display: flex;
  }
  .clients__filter-search-wrapper {
    width: 100%;
    margin-right: 1rem;
  }
  .clients__filter-button-wrapper {
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 57px;
    height: 44px;
    border-radius: 8px;
  }
  .clients__filter-button {
    margin-top: 0 !important;
  }
  .text_input__wrapper {
    margin-bottom: 24px;
  }
  .ant-btn {
    margin-top: 40px;
  }
  .mobile-filters {
    &__trigger {
      width: 24px;
      height: auto;
    }
  }
`
