import React from 'react';
import {StyleSheet} from 'react-native';
import BaseText from "./BaseText";
import {BaseTouchableOpacity, BaseTouchableOpacityProps} from "./BaseTouchableOpacity";
import {IStyle} from "../../../../backend/types";
import {useAppContext} from "../../functions/app";

interface BaseButtonProps extends BaseTouchableOpacityProps {
    title?: string;
    boxStyle?: IStyle;
    textStyle?: IStyle;
    icon?: string;
    iconComponent?: string;
}

const BaseButton = (props: BaseButtonProps) => {

    const appContext = useAppContext();

    let IconComponent;
    if (props.iconComponent) {
        IconComponent = appContext.componentMap[props.iconComponent];
    }

    return <BaseTouchableOpacity {...props} style={[styles.box, props.boxStyle]}>
        {props.iconComponent && <IconComponent name={props.icon} size={24} color="#fff"/>}
        {props.title && <BaseText style={props.textStyle}>{props.title}</BaseText>}
    </BaseTouchableOpacity>;
};
const styles = StyleSheet.create({
    box: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#24a1a2',
        padding: 15,
        flexDirection: 'row',
        gap: 8,
    },
});

export default BaseButton;
