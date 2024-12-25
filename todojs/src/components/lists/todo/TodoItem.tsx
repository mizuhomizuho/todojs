import React from 'react';
import BaseText from "../../bases/BaseText";
import BaseView, {BaseViewProps} from "../../bases/BaseView";
import BaseButton from "../../bases/BaseButton";
import {StyleSheet} from "react-native";
import {useAppContext} from "../../../functions/app";
import {PAGE_EDIT} from "../../../constants";
import {getPage} from "../../../functions/navigation";

export interface TodoItemProps extends BaseViewProps {
    itemId: string;
    title: string;
}

const TodoItem = (props: TodoItemProps) => {

    const appContext = useAppContext();

    return <BaseView style={styles.item} {...props}>
        <BaseText style={styles.text}>{props.title}</BaseText>
        <BaseView style={styles.buttons}>
            <BaseView style={styles.buttonLeft}>
                <BaseButton iconComponent="MaterialIcons" icon="delete-outline" title="Delete"/>
            </BaseView>
            <BaseView style={styles.buttonRight}>
                <BaseButton title="Edit" iconComponent="MaterialIcons" icon="edit-note" onPress={() => {
                    appContext.todoEditId.set(props.itemId);
                    appContext.nav.setCurrentPage(getPage(PAGE_EDIT));
                }}/>
            </BaseView>
        </BaseView>
    </BaseView>;
};

const styles = StyleSheet.create({
    item: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#2b2d30',
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

