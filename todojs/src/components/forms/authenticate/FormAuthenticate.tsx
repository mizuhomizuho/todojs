import {StyleSheet} from 'react-native';
import BaseTextInput from "../../bases/BaseTextInput";
import BaseView from "../../bases/BaseView";
import BaseButton from "../../bases/BaseButton";
import {handleAuthenticateForm, useAuthenticateForm} from "../../../functions/authenticate/authenticateForm";
import {getPage} from "../../../functions/navigation";
import {PAGE_REGISTER} from "../../../constants";
import BaseText from "../../bases/BaseText";

const FormAuthenticate = () => {

    const {
        username,
        setUsername,
        password,
        setPassword,
        appContext,
    } = useAuthenticateForm();

    const handleAuthenticate = async () => {
        await handleAuthenticateForm(username, password, appContext);
    };

    return <BaseView style={styles.container}>
        <BaseText style={styles.title}>Authenticate</BaseText>
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
        <BaseButton
            title="Ok"
            onPress={handleAuthenticate}
        />
        <BaseButton
            boxStyle={styles.register}
            title="Register"
            onPress={() => appContext.nav.setCurrentPage(getPage(PAGE_REGISTER))}
        />
    </BaseView>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 15,
    },
    title: {
        fontSize: 26,
        textAlign: 'center',
        marginBottom: 30,
    },
    register: {
        marginTop: 15,
    },
});

export default FormAuthenticate;
