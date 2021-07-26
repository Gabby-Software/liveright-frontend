import React, {useState, useEffect, ComponentType} from 'react';
import api from "../managers/api.manager";
import {serverError} from "../pipes/server-error.pipe";

const apiMemo: any = {};
export interface APIGetType<G> {
    data: G;
    loading: boolean;
    error: string;
}
type PropsType = {
    url: string;
    children: ComponentType<APIGetType<any>>
}
const APIGet = ({url, children:Children}:PropsType) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [data, setData] = useState<any>(null);
    useEffect(() => {
        if(apiMemo[url]) {
            setLoading(false);
            setError('');
            setData(apiMemo[url]);
            return;
        }
        setLoading(true);
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
    }, [url]);
    return <Children data={data} error={error} loading={loading}/>
};

export default APIGet;