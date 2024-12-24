import React from 'react';
import {StyleSheet} from 'react-native';
import {INavigationItem} from "../../../types/types";
import {NAVIGATION_ITEMS, STORAGE_NAVIGATION_ID_KEY} from "../../../constants";
import {getPage} from "../../../functions/navigation";
import BaseView from "../../bases/BaseView";
import BaseButton from "../../bases/BaseButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useAppContext} from "../../../functions/app";
import {isAuthenticate} from "../../../functions/authenticate/authenticate";
import {debug} from "../../../functions/debug";

type NavigationItemProps = {
    item: INavigationItem;
};

const NavigationItem = (props: NavigationItemProps) => {

    const appContext = useAppContext();

    const buttonBoxStyles = {
        ...styles.button,
        ...(props.item.id === appContext.nav.currentPage.id ? styles.active : {}),
    };

    const setPage = async () => {
        await AsyncStorage.setItem(STORAGE_NAVIGATION_ID_KEY, props.item.id);
        appContext.nav.setCurrentPage(getPage(props.item.id));
    };

    return <BaseButton
        boxStyle={buttonBoxStyles}
        textStyle={styles.buttonText}
        title={getPage(props.item.id).text}
        onPress={setPage}/>;
};

const styles = StyleSheet.create({
    active: {
        backgroundColor: '#186e6e',
    },
    button: {
        height: 60,
    },
    buttonText: {
        fontSize: 17,
    },
});

export default NavigationItem;
