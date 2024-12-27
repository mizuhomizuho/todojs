import axios from "axios";

import {IStringObject, IStringObjectTree} from "../../../backend/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {STORAGE_USER_JWT} from "../constants";

export async function api(route: string, params: IStringObject): Promise<{data: IStringObjectTree} | false> {

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:881',
        // proxy: {
        //     host: 'localhost',
        //     port: +location.port,
        // },
    });

    try {
        const userJWT = await AsyncStorage.getItem(STORAGE_USER_JWT);
        const response = await axiosInstance.post(
            'http://localhost:881/' + route, {...params, userJWT}
        );
        // console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        // console.error('Error during the request:', error);
        processingError(error);
    }
    return false;
}

function processingError(error: unknown) {
    if (!(error instanceof axios.AxiosError)) {
        alert('Error');
        return;
    }
    const messages = [];
    if (error?.response?.data?.message) {
        messages.push(error.response.data.message);
    }
    if (error?.response?.data?.errors instanceof Array) {
        error.response.data.errors.forEach((error: { [key: string]: string }) => {
            messages.push(error.message);
        });
    }
    if (!messages.length) {
        alert('Error');
        return;
    }
    alert(messages.join('\n'));
}