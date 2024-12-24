import axios from "axios";
import {IItemCommon} from "../types/types";

export const api = async (route: string, params: IItemCommon) => {

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:881',
        // proxy: {
        //     host: 'localhost',
        //     port: +location.port,
        // },
    });

    try {
        const response = await axiosInstance.post('http://localhost:881/' + route, params);
        console.log('Response:', response.data);
    } catch (error) {
        // console.error('Error during the request:', error);
        processingError(error);
    }
};

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