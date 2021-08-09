import React, {useState, useEffect, useRef} from 'react';
import Styles from './clients-desktop.styles';
import {useTranslation} from "../../../modules/i18n/i18n.hook";
import {PaginationMetaType} from "../../../types/pagination-meta.type";
import {clients} from "../clients.data";
import {TableActionType} from "../../../types/table-action.type";
import {ReactComponent as WorkoutIcon} from "../../../assets/media/icons/workout.svg";
import {ReactComponent as ExerciseIcon} from "../../../assets/media/icons/exercise.svg";
import {ReactComponent as FoodIcon} from "../../../assets/media/icons/food.svg";
import {ReactComponent as MeasureIcon} from "../../../assets/media/icons/measure.svg";
import ClientsFilter from "../../../components/clients/clients-filter/clients-filter.component";
import DataTable from "../../../components/data-table/data-table.component";
import ActionIcon from "../../../components/action-icon/action-icon.component";
import DataPagination from "../../../components/data-pagination/data-pagination.component";
import {useAPIData} from "../../../hoc/api-get";
import logger from "../../../managers/logger.manager";
import {useClients} from "../../../hooks/clients.hook";
import {useDispatch} from "react-redux";
import {ACTION_GET_CLIENTS_REQUEST} from "../../../store/action-types";
import Link from "../../../components/link/link.component";
import {Routes} from "../../../enums/routes.enum";
import {Skeleton} from "antd";
import {capitalize} from "../../../pipes/capitalize.pipe";

type Props = {};
const ClientsDesktop = ({}:Props) => {
    const {t} = useTranslation();
    const {data: {data, meta},loading, error, filters} = useClients();
    const dataRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const labels: string[] = [
        'clients:client-name',
        'profile:email',
        'profile:phone',
        'clients:sessions',
        'clients:status',
        ''
    ];
    const keys: string[] = [
        'name',
        'email', 'phone_number', 'sessions', 'status', 'actions'
    ];
    const actions: TableActionType[] = [
        {icon: WorkoutIcon, onClick: () => {}, title: 'Workshops'},
        {icon: ExerciseIcon, onClick: () => {}, title: 'Exercises'},
        {icon: FoodIcon, onClick: () => {}, title: 'Meals'},
        {icon: MeasureIcon, onClick: () => {}, title: 'Measures'},
    ];
    const setPage = (page: number) => {
        dispatch({type: ACTION_GET_CLIENTS_REQUEST, payload: {
            query: filters.query,
            status: filters.status,
            page,
            onSuccess:()=> {
                if(!dataRef.current) return;
                window.scrollTo({
                    top: window.scrollY+dataRef.current.getBoundingClientRect().top-24,
                    behavior:"smooth"
                });
            }
        }});
    };
    // if(!data.length) {
    //     return (
    //         <Styles>
    //             <p>You have no clients currently</p>
    //         </Styles>
    //     );
    // }
    return (
        <Styles>
            <div className={'clients__cont'}>
                <ClientsFilter/>
                <div ref={dataRef}>
                            <DataTable labels={labels} data={data}
                                       loading={loading} error={error}
                                       keys={keys} render={{
                                name: ({first_name, last_name, id, user_uuid, status}) => (
                                    status === 'awaiting'?<div>{`${first_name} ${last_name}`}</div>:(
                                        <Link to={`${Routes.CLIENTS}/${user_uuid}`}>{`${first_name} ${last_name}`}</Link>
                                    )
                                ),
                                actions: () => (
                                    <div className={'clients__activities'}>
                                        {actions.map((item) => (
                                            <ActionIcon {...item} className={'clients__action'}/>
                                        ))}
                                    </div>
                                ),
                                status: ({status}) => capitalize(status),
                                sessions: ({sessions}) => t('clients:sessions-remind', {n:sessions||0})
                            }}/>
                </div>
                <DataPagination page={meta?.current_page}
                                setPage={(current_page: number) => setPage(current_page)}
                                total={meta?.total}/>
                {/*{*/}
                {/*    data.length ? null : <p className={'clients__no-data'}>{t('no-data')}</p>*/}
                {/*}*/}
            </div>
        </Styles>
    );
};

export default ClientsDesktop;
