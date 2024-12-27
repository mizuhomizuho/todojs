import React from 'react';
import BaseText from "../../bases/BaseText";
import BaseView, {BaseViewProps} from "../../bases/BaseView";
import BaseButton from "../../bases/BaseButton";
import {StyleSheet} from "react-native";

export interface TodoItemProps extends BaseViewProps {
    itemId: string;
    title: string;
    onEventEdit: Function,
    onEventDelete: Function,
}

const TodoItem = (props: TodoItemProps) => {

    function truncateString(str: string, maxLength: number = 80): string {
        if (str.length > maxLength) {
            return str.slice(0, maxLength - 3) + '...';
        }
        return str;
    }

    return <BaseView style={styles.item} {...props}>
        <BaseText style={styles.text}>{truncateString(props.title)}</BaseText>
        <BaseView style={styles.buttons}>
            <BaseView style={styles.buttonLeft}>
                <BaseButton iconComponent="MaterialIcons" icon="delete-outline" title="Delete"
                            onPress={() => props.onEventDelete()}/>
            </BaseView>
            <BaseView style={styles.buttonRight}>
                <BaseButton title="Edit" iconComponent="MaterialIcons" icon="edit-note"
                            onPress={() => props.onEventEdit()}/>
            </BaseView>
        </BaseView>
    </BaseView>;
};

const styles = StyleSheet.create({
    item: {
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    text: {
        marginBottom: 15,
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
    },
    buttonLeft: {
        flexGrow: 1,
        width: '50%',
        borderRightWidth: 8,
        borderColor: 'transparent',
    },
    buttonRight: {
        flexGrow: 1,
        width: '50%',
        borderLeftWidth: 8,
        borderColor: 'transparent',
    },
});

export default TodoItem;

