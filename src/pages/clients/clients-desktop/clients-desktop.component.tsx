import React, {useState, useEffect} from 'react';
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

type Props = {};
const ClientsDesktop = ({}:Props) => {
    const {t} = useTranslation();
    const [{total, current_page, per_page}, setPagMeta] = useState<PaginationMetaType>({total: clients.length, per_page:10, current_page:1});
    const labels: string[] = [
        'clients:client-name',
        'profile:email',
        'profile:phone',
        'clients:sessions',
        'clients:status',
        ''
    ];
    const keys: string[] = [
        'first_name',
        'email', 'phone', 'sessions', 'status', 'actions'
    ];
    const actions: TableActionType[] = [
        {icon: WorkoutIcon, onClick: () => {}, title: 'Workshops'},
        {icon: ExerciseIcon, onClick: () => {}, title: 'Exercises'},
        {icon: FoodIcon, onClick: () => {}, title: 'Meals'},
        {icon: MeasureIcon, onClick: () => {}, title: 'Measures'},
    ];
    return (
        <Styles>
            <div className={'clients__cont'}>
                <ClientsFilter/>
                <DataTable labels={labels} data={clients.slice((current_page-1)*per_page,current_page*per_page)}
                           keys={keys} render={{
                    first_name: ({first_name, last_name}) => `${first_name} ${last_name}`,
                    actions: () => (
                        <div className={'clients__activities'}>
                            {actions.map((item) => (
                            <ActionIcon {...item} className={'clients__action'}/>
                        ))}
                        </div>
                    ),
                    status: ({active}) => active? t('clients:active'):t('clients:inactive'),
                    sessions: ({sessions}) => t('clients:sessions-remind', {n:sessions})
                }}/>
                <DataPagination page={current_page}
                                setPage={(current_page: number) => setPagMeta({current_page, per_page, total})}
                                total={total}/>
            </div>
        </Styles>
    );
};

export default ClientsDesktop;
