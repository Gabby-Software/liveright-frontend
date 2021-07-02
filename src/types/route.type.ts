import {ComponentType, ReactNode, FC} from "react";
import {footerTypes} from "../enums/footer-types";

export enum HeaderItemTypes {
    ICON, IMAGE, SPACE, SUBMIT
}
export type HeaderItemType = {
    type: HeaderItemTypes;
    href?: string;
    url?: string;
    Icon?: ComponentType;
}
export type HeaderConfigType = {
    items?: HeaderItemType[];
    title?: string;
}
export type RouteType = {
    title: string;
    url: string;
    Component: ComponentType;
    props?: {[key: string]: any};
    header: HeaderConfigType;
    footer?: footerTypes;
}
