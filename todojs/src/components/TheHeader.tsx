import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import BaseText from "./bases/BaseText";

type TheHeaderProps = {};

const TheHeader: React.FC<TheHeaderProps> = (props) => {
    return <View style={styles.customStyle}>
        <BaseText style={styles.text}>Todo List</BaseText>
    </View>;
};

const styles = StyleSheet.create({
    customStyle: {
        position: 'relative',
        zIndex: 1,
        backgroundColor: '#24a1a2',
        paddingHorizontal: 15,
        paddingTop: Platform.OS === 'web' ? 10 : 30,
        paddingBottom: 10,
        borderBottomWidth: 1,
    },
    text: {
        fontSize: 26,
    },
});

export default TheHeader;

