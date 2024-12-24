import React from 'react';
import {StyleSheet} from 'react-native';
import BaseText from "./BaseText";
import {BaseTouchableOpacity, BaseTouchableOpacityProps} from "./BaseTouchableOpacity";

import {IStyle} from "../../../../types";

interface BaseButtonProps extends BaseTouchableOpacityProps {
    title: string;
    boxStyle?: IStyle;
    textStyle?: IStyle;
}

const BaseButton = (props: BaseButtonProps) => {
    return <BaseTouchableOpacity {...props} style={[styles.box, props.boxStyle]}>
        <BaseText style={props.textStyle}>{props.title}</BaseText>
    </BaseTouchableOpacity>;
};

const styles = StyleSheet.create({
    box: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#24a1a2',
        padding: 15,
    },
});

export default BaseButton;
