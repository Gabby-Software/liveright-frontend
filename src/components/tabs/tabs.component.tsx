import React, {ReactElement} from 'react';
import AntdTabs from './tabs.styles'

interface Props {
    tabs: {
        label: string;
        renderContent: () => ReactElement
    }[];
}

const Tabs: React.FC<Props> = (props) => {
    const {tabs} = props;

    return (
        <AntdTabs>
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
