import {Animated, StyleSheet} from 'react-native';
import BaseTextInput from "../../bases/BaseTextInput";
import BaseView from "../../bases/BaseView";
import BaseButton from "../../bases/BaseButton";
import BaseDateTimePicker from "../../bases/BaseDateTimePicker";
import BaseText from "../../bases/BaseText";
import {BaseSelect} from "../../bases/BaseSelect";
import {STATUS_ITEMS} from "../../../constants";
import {
    DEADLINE_DAYJS_FORMAT,
    handleTodoItemForm,
    setValue,
    useTodoItemForm
} from "../../../functions/todo/todoItemForm";
import dayjs from "dayjs";
import React from "react";
import {useAppContext} from "../../../functions/app";
import ScrollView = Animated.ScrollView;

interface FormTodoItemProps {
    storageId: string;
    editId: string | null;
}

const FormTodoItem = (props: FormTodoItemProps) => {

    const appContext = useAppContext();

    const {
        title,
        setTitle,
        description,
        setDescription,
        status,
        setStatus,
        comments,
        setComments,
        deadline,
        setDeadline,
    } = useTodoItemForm(appContext, props.storageId, props.editId);

    const handleSubmit = async () => {
        await handleTodoItemForm(
            title.value,
            description.value,
            status.value,
            comments.value,
            dayjs(deadline.value).unix(),
            appContext,
        );
    };

    return <ScrollView>
        <BaseView style={styles.container}>
            <BaseTextInput
                placeholder="Title *"
                value={title.value}
                onChangeText={(value) => setTitle(setValue(value))}
            />
            <BaseTextInput
                placeholder="Description"
                value={description.value}
                onChangeText={(value) => setDescription(setValue(value))}
            />
            <BaseTextInput
                placeholder="Comments"
                value={comments.value}
                onChangeText={(value) => setComments(setValue(value))}
            />
            <BaseView style={styles.box}>
                <BaseText style={styles.boxTitle}>
                    Deadline: {dayjs(deadline.value).format(DEADLINE_DAYJS_FORMAT)}
                </BaseText>
                <BaseDateTimePicker
                    date={deadline.value}
                    setDate={(value: string) => setDeadline(setValue(value))}
                />
            </BaseView>
            <BaseView style={styles.box}>
                <BaseText style={styles.boxTitle}>Status</BaseText>
                <BaseSelect
                    items={STATUS_ITEMS}
                    value={status.value}
                    onPress={(value: string) => {
                        setStatus(setValue(value));
                    }}
                />
            </BaseView>
            <BaseButton
                title="Submit"
                onPress={handleSubmit}
            />
        </BaseView>
    </ScrollView>;
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        paddingTop: 30,
        paddingBottom: 30,
    },
    box: {
        padding: 15,
        backgroundColor: '#2b2d30',
        borderColor: '#4e4e4e',
        marginBottom: 15,
    },
    boxTitle: {
        borderBottomWidth: 1,
        textAlign: 'center',
        borderColor: '#4e4e4e',
        paddingBottom: 15,
        marginBottom: 15,
    },
});

export default FormTodoItem;
