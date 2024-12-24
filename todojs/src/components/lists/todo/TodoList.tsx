import React, {useEffect, useState} from 'react';
import TodoItem from "./TodoItem";
import BaseFlatList from "../../bases/BaseFlatList";
import {useAppContext} from "../../../functions/app";
import {debug} from "../../../functions/debug";
import {IItemTodo} from "../../../../../types";

const TodoList = () => {

    const appContext = useAppContext();

    const [tidoItems, setTidoItems] = useState<IItemTodo[]>([]);

    async function init() {
        appContext.load.setPreloader(true);
        await new Promise<void>((resolve) => {
            setTimeout(() => {
                const data: IItemTodo[] = [];
                for (let i = 0; i < 8; i++) {
                    data.push({id: '' + i, name: 'Item ' + i})
                }
                setTidoItems(data);
                resolve();
            }, 15);
        });
        appContext.load.setPreloader(false);
    }

    useEffect(() => {
        debug(appContext, {
            'TodoList_mount': 1,
        });
        init();
        return () => {
            debug(appContext, {
                'TodoList_unmount': 1,
            });
        };
    }, []);

    const renderItem = ({item}: { item: IItemTodo }) => (
        <TodoItem title={item.name} itemId={item.id}/>
    );

    return <BaseFlatList
        data={tidoItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
    />;
};

export default TodoList;

