import {ComponentType} from "react";

export type RouteType = {
    title: string;
    url: string;
    Component: ComponentType;
    props?: {[key: string]: any}
}
