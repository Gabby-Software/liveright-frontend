import React, {ReactElement} from 'react';
import {TabsPosition} from "antd/es/tabs";

import AntdTabs from './tabs.styles'

interface Props {
    tabPosition?: TabsPosition;
    activeKey?: string;
    onChange?: (key: string) => void;
    tabs: {
        key?: string;
        label: string;
        renderContent: () => ReactElement
    }[];
}

const Tabs: React.FC<Props> = (props) => {
    const {tabs, tabPosition, activeKey, onChange} = props;

    return (
        <AntdTabs tabPosition={tabPosition} activeKey={activeKey} onChange={onChange}>
            {tabs.map(({label, key, renderContent}) => {
                return (
                    <AntdTabs.TabPane tab={label} key={key || label}>
                        {renderContent()}
                    </AntdTabs.TabPane>
                )
            })}
        </AntdTabs>
    )
}

export default Tabs
