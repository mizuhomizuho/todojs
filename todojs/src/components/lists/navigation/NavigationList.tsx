import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BaseView from "../../bases/BaseView";
import {NAVIGATION_ITEMS} from "../../../constants";
import NavigationItem from "./NavigationItem";
import {useAppContext} from "../../../functions/app";
import {isAuthenticate} from "../../../functions/authenticate/authenticate";
import {debug} from "../../../functions/debug";

const NavigationList = () => {

    const appContext = useAppContext();

    if (!isAuthenticate(appContext)) {
        return <BaseView/>;
    }

    return <BaseView style={styles.list}>
        {NAVIGATION_ITEMS.map((item, index) => {
            const classKey: string = 'item' + index;
            const classValue = styles[classKey as keyof typeof styles];
            return <BaseView key={index.toString()} style={classValue}>
                <NavigationItem item={item}/>
            </BaseView>;
        })}
    </BaseView>;
};

const styles = StyleSheet.create({
    list: {
        backgroundColor: '#1e1f22',
        position: 'relative',
        zIndex: 1,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: '#1e1f22',
    },
    item0: {
        flexGrow: 1,
        width: '50%',
        borderRightWidth: 1,
        borderColor: 'transparent',
    },
    item1: {
        flexGrow: 1,
        width: '50%',
        borderLeftWidth: 1,
        borderColor: 'transparent',
    },
});

export default NavigationList;

