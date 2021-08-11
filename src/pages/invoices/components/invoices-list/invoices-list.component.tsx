import React, {useState, useEffect, useRef, useContext} from 'react';
import Styles from './invoices-list.styles';
import {useTranslation} from "../../../../modules/i18n/i18n.hook";
import {invoices} from "../../invoices.data";
import InvoicesListItem from "../invoices-list-item/invoices-list-item.component";
import DataPagination from "../../../../components/data-pagination/data-pagination.component";
import logger from "../../../../managers/logger.manager";
import {useAuth} from "../../../../hooks/auth.hook";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store/reducers";
import {InvoiceType} from "../../../../types/invoice.type";
import {ACTION_GET_INVOICES_REQUEST} from "../../../../store/action-types";
import {Skeleton} from "antd";

const InvoicesList = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {current:{meta, data}, loading, error} = useSelector((state: RootState) => state.invoices);
    const head = useRef<HTMLDivElement>(null);
    const updatePage = (p: number) => {
        dispatch({
            type: ACTION_GET_INVOICES_REQUEST, payload: {
                page: p, onSuccess: () => {
                    if (!head.current) return;
                    window.scrollTo({
                        top: window.scrollY + head.current.getBoundingClientRect().top - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    };
    logger.info(window.scrollY, head.current, head.current?.getBoundingClientRect().top, head.current?.offsetTop);
    return (
        <Styles ref={head}>
            {
                loading?(
                    <Skeleton/>
                ) : error ?(
                    <p>{error}</p>
                ) : !data.length? (
                    <p>{t('invoices:no-data')}</p>
                ) : (
                    <>
                        {data.map((inv: InvoiceType) => <InvoicesListItem {...inv} key={inv.id}/>)}
                        <DataPagination page={meta.current_page} setPage={updatePage} total={meta.total}/>
                    </>
                )
            }
        </Styles>
    );
};

export default InvoicesList;
