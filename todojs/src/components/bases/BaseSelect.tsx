import {IItemCommon, IStyle} from "../../../../types";
import React from "react";
import {StyleSheet} from "react-native";
import BaseText from "./BaseText";
import {BaseTouchableOpacity} from "./BaseTouchableOpacity";
import BaseView from "./BaseView";

type BaseSelectProps = {
    onPress: CallableFunction;
    items: IItemCommon[];
    value: string;
};

export const BaseSelect = (props: BaseSelectProps) => {

    return <BaseView style={styles.list}>
        {props.items.map((item, index) => {
            const elementStyles: IStyle[] = [];
            elementStyles.push(styles.item);
            if (props.value === item.id) {
                elementStyles.push({backgroundColor: '#24a1a2'});
            }
            return <BaseTouchableOpacity key={item.id} style={elementStyles} onPress={() => props.onPress(item.id)}>
                <BaseText>{item.label}</BaseText>
            </BaseTouchableOpacity>;
        })}
    </BaseView>;
};

const styles = StyleSheet.create({
    list: {
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#545557',
    },
    item: {
        borderTopWidth: 1,
        borderColor: '#545557',
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#2b2d30',
    },
});