import React from 'react';
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";

import {DEADLINE_DAYJS_FORMAT} from "../../constants";

export interface BaseDateTimePickerProps {
    date: string;
    setDate: CallableFunction;
}

const BaseDateTimePicker = (props: BaseDateTimePickerProps) => {

    let date = props.date;
    if (date === '') {
        date = dayjs().add(1, 'hour').format(DEADLINE_DAYJS_FORMAT);
    }

    return <DateTimePicker
        mode="single"
        date={dayjs(date)}
        timePicker={true}
        calendarTextStyle={{color: '#fff'}}
        headerTextStyle={{color: '#fff'}}
        headerButtonColor={'#fff'}
        selectedItemColor={'#24a1a2'}
        dayContainerStyle={{backgroundColor: '#2b2d30', borderRadius: 0}}
        weekDaysTextStyle={{color: '#fff'}}
        todayTextStyle={{color: '#fff'}}
        headerTextContainerStyle={{backgroundColor: '#24a1a2', borderRadius: 0}}
        monthContainerStyle={{backgroundColor: '#2b2d30', borderColor: '#4e4e4e'}}
        yearContainerStyle={{backgroundColor: '#2b2d30', borderColor: '#4e4e4e'}}
        timePickerTextStyle={{color: '#fff'}}
        onChange={(params) => props.setDate(params.date)}
    />;
};

export default BaseDateTimePicker;
