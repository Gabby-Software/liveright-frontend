import {ComponentType, ReactNode, FC} from "react";

export type HeaderItemType = {
    url: string;
    Icon: ComponentType;
}
export type HeaderConfigType = {
    back?: string;
    items?: HeaderItemType[];
    title?: string;
}
export type RouteType = {
    title: string;
    url: string;
    Component: ComponentType;
    props?: {[key: string]: any};
    header: HeaderConfigType;
}
