import React from 'react';
import TodoItem from "./TodoItem";
import BaseFlatList from "../../bases/BaseFlatList";
import {useAppContext} from "../../../functions/app";
import {ITodoItem} from "../../../../../backend/types";
import {deleteItem, editItem, useTodoList} from "../../../functions/todo/todoList";
import BaseText from "../../bases/BaseText";
import BaseView from "../../bases/BaseView";
import {StyleSheet} from "react-native";

const TodoList = () => {

    const appContext = useAppContext();
    const {tidoItems, setTidoItems} = useTodoList(appContext);

    if (tidoItems === null) {
        return <BaseView/>;
    }
    else if (!tidoItems.length) {
        return <BaseView style={styles.empty}>
            <BaseText>Empty...</BaseText>
        </BaseView>;
    }

    function edit(itemId: string) {
        editItem(appContext, itemId);
    }

    async function del(itemId: string) {
        await deleteItem(appContext, itemId, tidoItems as ITodoItem[], setTidoItems);
    }

    const renderItem = (
        {item}: { item: ITodoItem }
    ) => <TodoItem
        title={item.title}
        itemId={item.id}
        onEventEdit={() => edit(item.id)}
        onEventDelete={() => del(item.id)}
    />;

    return <BaseFlatList
        data={tidoItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
    />;
};

const styles = StyleSheet.create({
    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
});

export default TodoList;

