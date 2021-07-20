import React, {useState, useEffect} from 'react';
import Styles from './table-pagination.styles';
import {ReactComponent as LeftArrow} from '../../assets/media/icons/left-arrow.svg';
import {ReactComponent as RightArrow} from '../../assets/media/icons/right-arrow.svg';

type Props = {
    page: number;
    setPage: (p:number) => void;
    total: number;
};
const PER_PAGE = 10;
const TablePagination = ({page, setPage, total}:Props) => {
    return (
        <Styles>
            <div className={'t-pagination__left'}>
                {(page-1)*PER_PAGE+1}-{Math.min(page*PER_PAGE, total)}
                <span className={'t-pagination__light'}>&nbsp;of&nbsp;</span>
                {total}
            </div>
            <div className={'t-pagination__right'}>
                Page <span className={'t-pagination__page'}>{page}</span>
                <div className={'t-pagination__actions'}>
                    <LeftArrow className={'t-pagination__action t-pagination__action__prev'}
                        onClick={() => setPage(Math.max(page-1,1))}/>
                    <RightArrow className={'t-pagination__action t-pagination__action__next'}
                        onClick={() => setPage(Math.min(page+1, Math.ceil(total/PER_PAGE)))}/>
                </div>
            </div>
        </Styles>
    )
};

export default TablePagination;
