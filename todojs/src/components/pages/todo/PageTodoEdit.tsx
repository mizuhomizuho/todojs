import React from 'react';
import FormTodoItem from "../../forms/todo/FormTodoItem";
import {useAppContext} from "../../../functions/app";
import {debug} from "../../../functions/debug";

const PageTodoAdd = () => {

    const appContext = useAppContext();

    return <FormTodoItem editId={appContext.todoEditId.value}/>;
};

export default PageTodoAdd;

