import React, {useEffect} from 'react';
import BaseActivityIndicator from "./BaseActivityIndicator";
import {StyleSheet, View} from "react-native";
import {useAppContext} from "../../functions/app";
import {debug} from "../../functions/debug";

import {IStyle} from "../../../../backend/types";

const BaseLoading = () => {

    const appContext = useAppContext();

    useEffect(() => {
        debug(appContext, {
            'BaseLoading_mount': 1,
        });
    }, []);

    const bosStyles: IStyle[] = [];
    bosStyles.push(styles.container);
    if (appContext.load.preloader) {
        bosStyles.push({display: 'flex'});
    }

    return <View style={bosStyles}>
        <BaseActivityIndicator size="large" color="#24a1a2"/>
    </View>;
};

const styles = StyleSheet.create({
    container: {
        display: 'none',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 1,
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, .8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default BaseLoading;

