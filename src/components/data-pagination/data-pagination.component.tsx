import React, {useState, useEffect} from 'react';
import Pagination from './data-pagination.styles';

type Props = {
    page: number;
    setPage: (page: number) => void;
    total: number;
};
const DataPagination = ({page, setPage, total}:Props) => {
    if(total < 10) return null;
    return (
        <Pagination current={page} defaultCurrent={1} total={total} onChange={setPage}/>
    )
};

export default DataPagination;
