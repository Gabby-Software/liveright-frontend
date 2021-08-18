import React, {ReactElement} from 'react';
import {TabsPosition} from "antd/es/tabs";

import AntdTabs from './tabs.styles'

interface Props {
    tabPosition?: TabsPosition;
    tabs: {
        label: string;
        renderContent: () => ReactElement
    }[];
}

const Tabs: React.FC<Props> = (props) => {
    const {tabs, tabPosition} = props;

    return (
        <AntdTabs tabPosition={tabPosition}>
            {tabs.map(({label, renderContent}) => {
                return (
                    <AntdTabs.TabPane tab={label} key={label}>
                        {renderContent()}
                    </AntdTabs.TabPane>
                )
            })}
        </AntdTabs>
    )
}

export default Tabs
