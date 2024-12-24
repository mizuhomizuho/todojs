import React from 'react';
import {View, ViewProps} from 'react-native';

export interface BaseViewProps extends ViewProps {
}

const BaseView = (props: BaseViewProps) => {
    return <View {...props}/>;
};

export default BaseView;
