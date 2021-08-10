import React, {useState, useEffect, ComponentType, createContext, useContext} from 'react';
import api from "../managers/api.manager";
import {serverError} from "../pipes/server-error.pipe";

const apiMemo: any = {};

export interface APIGetType<G> {
    data: G;
    loading: boolean;
    error: string;
}
export interface APIGetContextType<G> extends APIGetType<G> {
    refetch: () => void;
    setData: (data: G) => void;
}

type PropsType = {
    url: string;
    children: ComponentType<APIGetType<any>>
}
const APIDataContext = createContext<APIGetContextType<any>>({loading: true, error: '', data: [], refetch: () => {}, setData: () => {}});
export function useAPIData<G>(){return useContext(APIDataContext) as APIGetContextType<G>}
const APIGet = ({url, children: Children}: PropsType) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [data, setData] = useState<any>(null);
    useEffect(() => {
        if (apiMemo[url]) {
            setLoading(false);
            setError('');
            setData(apiMemo[url]);
            return;
        }
        setLoading(true);
        refetch();
    }, [url]);
    const refetch = () => {
        api.get(url)
            .then(res => res.data.data)
            .then(res => {
                setError('');
                setData(res);
                apiMemo[url] = res;
                setLoading(false);
            })
            .catch((e) => {
                setError(serverError(e));
                setData(null);
                setLoading(false);
            })
    }
    return (
        <APIDataContext.Provider value={{error, loading, data, refetch, setData}}>
            <Children data={data} error={error} loading={loading}/>
        </APIDataContext.Provider>
    );
};

export default APIGet;
