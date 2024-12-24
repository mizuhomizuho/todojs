import {SafeAreaView, StyleSheet} from 'react-native';
import TheHeader from "./src/components/TheHeader";
import NavigationList from "./src/components/lists/navigation/NavigationList";
import BasePage from "./src/components/bases/BasePage";
import {AppContext, useApp} from "./src/functions/app";
import {COMPONENT_MAP} from "./src/componentMap";
import BaseLoading from "./src/components/bases/BaseLoading";
import React from "react";

const App = () => {

    const appContext = useApp();
    const CurrentPageComponent = COMPONENT_MAP[appContext.nav.currentPage.component];

    return (
        <AppContext.Provider value={appContext}>

            {/*<Text style={{position: 'absolute', zIndex: 3, backgroundColor: 'gold'}}>*/}
            {/*    888888888888888888888888888888888888888888888*/}
            {/*    8_______________5*/}
            {/*</Text>*/}
            {/*<BaseDebug/>*/}

            <SafeAreaView style={styles.body}>
                <BaseLoading/>
                <TheHeader/>
                <BasePage>
                    <CurrentPageComponent/>
                </BasePage>
                <NavigationList/>
            </SafeAreaView>
        </AppContext.Provider>
    );
};

const styles = StyleSheet.create({
    body: {
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: '#1e1f22',
    },
});

export default App;