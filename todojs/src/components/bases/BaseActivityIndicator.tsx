import React from 'react';
import {ActivityIndicator, ActivityIndicatorProps, ViewProps} from 'react-native';

export interface BaseActivityIndicatorProps extends ActivityIndicatorProps {
}

const BaseActivityIndicator = (props: BaseActivityIndicatorProps) => {
    return <ActivityIndicator {...props}/>;
};

export default BaseActivityIndicator;
