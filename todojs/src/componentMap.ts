import PageTodoList from "./components/pages/todo/PageTodoList";
import PageTodoAdd from "./components/pages/todo/PageTodoAdd";
import PageAuthenticate from "./components/pages/authenticate/PageAuthenticate";
import PageHome from "./components/pages/PageHome";
import PageTodoEdit from "./components/pages/todo/PageTodoEdit";
import PageRegister from "./components/pages/authenticate/PageRegister";

import {IComponentMap} from "../types";

export const COMPONENT_MAP: IComponentMap = {
    PageTodoList,
    PageTodoAdd,
    PageTodoEdit,
    PageAuthenticate,
    PageHome,
    PageRegister,
};
