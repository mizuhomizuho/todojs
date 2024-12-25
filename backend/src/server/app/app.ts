import {IBackendContext} from "../../../types";
import {ServiceContext} from "./service/context";

export const App: IBackendContext = {
    context: ServiceContext.Main,
};