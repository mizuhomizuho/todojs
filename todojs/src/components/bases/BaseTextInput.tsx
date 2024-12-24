import React from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';

export interface BaseTextInputProps extends TextInputProps {
}

const BaseTextInput = (props: BaseTextInputProps) => {
    return <TextInput style={styles.input} {...props} placeholderTextColor={'#fff'}/>;
};

const styles = StyleSheet.create({
    input: {
        marginBottom: 15,
        color: '#fff',
        borderWidth: 1,
        borderColor: '#4e4e4e',
        backgroundColor: '#2b2d30',
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
});

export default BaseTextInput;
