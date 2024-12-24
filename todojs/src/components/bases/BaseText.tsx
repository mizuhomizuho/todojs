import React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';

const BaseText = (props: TextProps) => {
    return <Text {...props} style={[styles.customStyle, props.style]} />;
};

const styles = StyleSheet.create({
    customStyle: {
        color: '#fff',
    },
});

export default BaseText;

