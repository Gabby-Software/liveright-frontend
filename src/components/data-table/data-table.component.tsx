import React, {useState, useEffect} from 'react';
import Styles from './data-table.styles';
import {useTranslation} from "../../modules/i18n/i18n.hook";
import {classes} from "../../pipes/classes.pipe";
import DataPagination from "../data-pagination/data-pagination.component";

interface Props<G> {
    labels:string[];
    keys?: string[];
    render?: {[key:string]: (item: G) => React.ReactNode};
    data: {[key:string]:any}[];
    onClick?: (item: G) => void;
    active?:number;
    children?: React.ReactNode;
    className?: string;
}
const DataTable = ({labels, render, data, keys, onClick, active, children, className}:Props<any>) => {
    const {t} = useTranslation();
    return (
        <Styles className={`data-table ${className}`}>
            <thead className={'data-table__head'}>
            {
                labels.map(label => (
                    <th className={'data-table__th'}>{t(label)}</th>
                ))
            }
            </thead>
            <tbody className={'data-table__body'}>
            {
                data.map((item) => (
                    <tr className={classes('data-table__tr', onClick&&'data-table__tr__clickable', active && active === item.id && 'data-table__tr__active')}
                        onClick={onClick?()=> onClick(item): undefined}>
                        {
                            (keys || labels).map((key) => (
                                <td className={'data-table__td'}
                                    {...(key==='options'||key==='actions'?{width:1}:{})}
                                >{render && render[key] ? render[key](item) : item[key]}</td>
                            ))
                        }
                    </tr>
                ))
            }
            {children}
            </tbody>
        </Styles>
    );
};

export default DataTable;
