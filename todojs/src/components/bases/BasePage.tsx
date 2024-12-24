import {StyleSheet} from 'react-native';
import BaseView, {BaseViewProps} from "./BaseView";
import React, {ReactNode} from "react";

interface BasePageProps extends BaseViewProps {
    children: ReactNode;
}

const BasePage = (props: BasePageProps) => {
    return <BaseView style={styles.box}>
        {props.children}
    </BaseView>;
};

const styles = StyleSheet.create({
    box: {
        flexGrow: 1,
        flexShrink: 1,
    },
});

export default BasePage;

