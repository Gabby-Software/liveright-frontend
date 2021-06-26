import React, {useState, useEffect, useRef} from 'react';
import Styles from './toast.styles';
import Animator from "../../hoc/animator/animator.component";
import {Alert} from 'antd'

export type ToastProps = {type: 'success'|'error', msg: string};
type ToastPropsInternal = ToastProps & {id: number};
let id = 0;
export const toast = {show: (props: ToastProps) => {}, duration: 2000};
const ToastItem = ({type, msg, idx}: ToastPropsInternal & {idx: number}) => {
    const [top, setTop] = useState(-50);
    useEffect(() => {
        setTop(idx * 50);
    }, [idx]);
    return (
        <Animator value={top} duration={300} func={Animator.SPRING(1)}>{({value}) => (
            <Alert showIcon message={msg} type={type} style={{top: `${value}px`, right:0, position:'absolute'}}/>
        )}</Animator>
    );
};
const Toast = () => {
    const [toasts,setToasts] = useState<ToastPropsInternal[]>([]);
    const tref = useRef<ToastPropsInternal[]>([]);
    toast.show = (props: ToastProps) => {
        const toastId = ++id;
        tref.current.unshift({...props, id:toastId});
        setToasts([...tref.current]);
        setTimeout(() => {
            tref.current = tref.current.filter(t => t.id !== toastId);
            setToasts([...tref.current]);
        }, toast.duration);
    };
    console.log('toasts', toasts);
    return (
        <Styles>
            {
                toasts.map((t, i) => (
                    <ToastItem {...t} idx={i} key={t.id}/>
                ))
            }
        </Styles>
    );
};
export default Toast;
