import React from 'react';
import TodoItem from "./TodoItem";
import BaseFlatList from "../../bases/BaseFlatList";
import {useAppContext} from "../../../functions/app";
import {ITodoItem} from "../../../../../backend/types";
import {deleteItem, editItem, useTodoList} from "../../../functions/todo/todoList";

const TodoList = () => {

    const appContext = useAppContext();
    const {tidoItems, setTidoItems} = useTodoList(appContext);

    function edit(itemId: string) {
        editItem(appContext, itemId);
    }

    async function del(itemId: string) {
        await deleteItem(appContext, itemId, tidoItems, setTidoItems);
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

export default TodoList;

