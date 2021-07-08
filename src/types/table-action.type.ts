import React from "react";

export type TableActionType = {
    icon: React.ComponentType<any>,
    onClick: () => void;
    color?: string;
}
