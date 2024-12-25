import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import BaseText from "./bases/BaseText";
import BaseView from "./bases/BaseView";
import {BaseTouchableOpacity} from "./bases/BaseTouchableOpacity";
import {useAppContext} from "../functions/app";
import {isAuthenticate, logout} from "../functions/authenticate/authenticate";

const TheHeader = () => {

    const appContext = useAppContext();

    const handleLogout = async () => {
        await logout(appContext);
    };

    return <BaseView style={styles.container}>
        <BaseView style={styles.box}>
            <BaseText style={styles.text}>Todo List</BaseText>
            {isAuthenticate(appContext)
                ? <BaseTouchableOpacity style={styles.button} onPress={handleLogout}>
                    <BaseText>Logout</BaseText>
                </BaseTouchableOpacity>
                : <BaseView/>}
        </BaseView>
    </BaseView>;
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        zIndex: 1,
        backgroundColor: '#24a1a2',
        paddingHorizontal: 15,
        paddingTop: Platform.OS === 'web' ? 10 : 30,
        paddingBottom: 10,
        borderBottomWidth: 1,
    },
    box: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
    },
    button: {
        alignSelf: 'center',
    },
    text: {
        fontSize: 26,
    },
});

export default TheHeader;

