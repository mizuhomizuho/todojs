import {StyleSheet} from 'react-native';
import BaseTextInput from "../../bases/BaseTextInput";
import BaseView from "../../bases/BaseView";
import BaseButton from "../../bases/BaseButton";
import BaseText from "../../bases/BaseText";
import {getPage} from "../../../functions/navigation";
import {PAGE_AUTHENTICATE} from "../../../constants";
import {handleRegisterForm, useRegisterForm} from "../../../functions/authenticate/registerForm";
import {useAppContext} from "../../../functions/app";

const FormRegister = () => {

    const appContext = useAppContext();

    const {
        username,
        setUsername,
        password,
        setPassword,
        password2,
        setPassword2,
    } = useRegisterForm();

    const handleRegister = async () => {
        await handleRegisterForm(username, password, password2, appContext);
    };

    return <BaseView style={styles.container}>
        <BaseText style={styles.title}>Register</BaseText>
        <BaseTextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
        />
        <BaseTextInput
            placeholder="Passwort"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
        />
        <BaseTextInput
            placeholder="Repeat password"
            value={password2}
            onChangeText={setPassword2}
            secureTextEntry
        />
        <BaseButton
            title="Ok"
            onPress={handleRegister}
        />
        <BaseButton
            boxStyle={styles.authenticate}
            title="Authenticate"
            onPress={() => appContext.nav.setCurrentPage(getPage(PAGE_AUTHENTICATE))}
        />
    </BaseView>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 26,
        textAlign: 'center',
        marginBottom: 30,
    },
    authenticate: {
        marginTop: 15,
    },
});

export default FormRegister;
