import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from "react-native";
import {useAppContext} from "../../functions/app";
import {debug} from "../../functions/debug";

const BaseDebug = () => {

    const appContext = useAppContext();

    useEffect(() => {
        debug(appContext, {
            'BaseDebug_mount': 1,
        });
    }, []);

    const renderItem = ({item}: { item: any }) => {
        return <View style={[styles.item, item.style]}><Text>{item.dump}</Text></View>;
    };

    return <View style={styles.container}>
        <FlatList
            data={appContext.debug.debugNative as []}
            renderItem={renderItem}
            keyExtractor={() => {
                return Date.now().toString(36) + Math.random().toString(36).substring(2);
            }}
        />
    </View>;
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 55,
        height: '88%',
        zIndex: 2,
        backgroundColor: 'red',
    },
    item: {
        borderTopWidth: 1,
    },
});

export default BaseDebug;

