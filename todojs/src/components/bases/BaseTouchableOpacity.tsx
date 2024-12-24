import React from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';

export interface BaseTouchableOpacityProps extends TouchableOpacityProps {}

export const BaseTouchableOpacity: React.FC<BaseTouchableOpacityProps> = (props) => {
    return <TouchableOpacity {...props}/>;
};
