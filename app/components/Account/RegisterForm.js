import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";

const RegisterForm = () => {
  const [securityPassword, setSecurityPassword] = useState(true);
  const [securityPasswordRepeat, setSecurityPasswordRepeat] = useState(true);
  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Correo electrónico"
        containerStyle={styles.inputForm}
        rightIcon={
          <Icon type="material-community" name="at" iconStyle={styles.icon} />
        }
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.inputForm}
        password={securityPassword}
        secureTextEntry={securityPassword}
        rightIcon={
          <Icon
            type="material-community"
            name={securityPassword ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.icon}
            onPress={() => setSecurityPassword(!securityPassword)}
          />
        }
      />
      <Input
        placeholder="Repetir contraseña"
        containerStyle={styles.inputForm}
        password={securityPasswordRepeat}
        secureTextEntry={securityPasswordRepeat}
        rightIcon={
          <Icon
            type="material-community"
            name={securityPasswordRepeat ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.icon}
            onPress={() => setSecurityPasswordRepeat(!securityPasswordRepeat)}
          />
        }
      />
      <Button
        title="Unirse"
        containerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnRegister}
      />
    </View>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  btnContainerRegister: {
    marginTop: 20,
    width: "95%",
  },
  btnRegister: {
    backgroundColor: "#00a680",
  },
  icon: {
    color: "#c1c1c1",
  },
});
