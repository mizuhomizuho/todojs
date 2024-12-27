import {IAuthenticate, IStringObject} from "../../../../../types";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import {Todo} from "@prisma/client";
import {ServiceRequestBase} from "./base";
import {ValidationBase} from "../../validation/base";

export namespace ServiceRequestTodo {

    export class Main extends ServiceRequestBase.Main {

        public getRequest() {

            const title: string = this.getValue('title').toString().trim();
            const description: string = this.getValue('description').toString().trim();
            const comments: string = this.getValue('comments').toString().trim();
            const status: string = this.getValue('status').toString().trim();
            const deadline: string = this.getValue('deadline').toString().trim();

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

        public getId() {
            const validation = new ValidationBase.Main({});
            if (!validation.validateNumericStringBase(this.getValue('id'))) {
                this.sendError();
                throw new Error('Invalid data.');
            }
            return +this.getValue('id');
        }
    }
}