import {IAuthenticate, ICommonObject, IStringObject, ITodoItemNew} from "../../../../../types";
import {App} from "../../app";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import {Todo} from "@prisma/client";
import {ServiceRequestBase} from "./base";

export namespace ServiceRequestTodo {

    export class Main extends ServiceRequestBase.Main {

        public getRequest() {

            const title: string = this.getValue('title').trim();
            const description: string = this.getValue('description').trim();
            const comments: string = this.getValue('comments').trim();
            const status: string = this.getValue('status').trim();
            const deadline: string = this.getValue('deadline').trim();

            const data: IStringObject = {
                title,
                description,
                comments,
                status,
                deadline,
            };

            return data;
        }

        public getPrismaTodo(id: number) {

            dayjs.extend(utc);
            dayjs.extend(timezone);

            const requestData = this.getRequest();

            const data = {
                ...requestData,
                id,
                deadline: new Date(dayjs.tz(+requestData.deadline * 1000, 'UTC').format()),
                userId: this.getUserId(),
            };

            return data as Todo;
        }

        public getId(): number {
            return +this.getValue('id').toString();
        }

        public getUserId(): number {
            const userJWTDecode: IAuthenticate = JSON.parse(this.getUserJWT());
            return +userJWTDecode.payload.id;
        }
    }
}