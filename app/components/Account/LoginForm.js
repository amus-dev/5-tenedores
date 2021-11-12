import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { isEmpty } from "lodash";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";
import { validateEmail } from "../../utils/validations";
import Loading from "../Loading";

const LoginForm = ({ toastRef }) => {
  const [loading, setLoading] = useState(false);
  const [securityPassword, setSecurityPassword] = useState(true);
  const [formData, setFormData] = useState(defaultFormValue);
  const navigation = useNavigation();

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const onSubmit = () => {
    if (isEmpty(formData.email) || isEmpty(formData.password)) {
      toastRef.current.show("Todos los campos son obligatorios");
    } else if (!validateEmail(formData.email)) {
      toastRef.current.show("El email no es correcto");
    } else {
      setLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          setLoading(false);
          navigation.navigate("account");
        })
        .catch(() => {
          setLoading(false);
          toastRef.current.show("Email o contraseña incorrecta");
        });
    }
  };

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Correo electrónico"
        containerStyle={styles.inputForm}
        rightIcon={
          <Icon type="material-community" name="at" iconStyle={styles.icon} />
        }
        onChange={(e) => onChange(e, "email")}
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
        onChange={(e) => onChange(e, "password")}
      />
      <Button
        title="Iniciar sesión"
        containerStyle={styles.btnContainerLogin}
        buttonStyle={styles.btnLogin}
        onPress={onSubmit}
      />
      <Loading isVisible={loading} text="Cargando" />
    </View>
  );
};

export default LoginForm;

function defaultFormValue() {
  return {
    email: "",
    password: "",
  };
}

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
  btnContainerLogin: {
    marginTop: 20,
    width: "95%",
  },
  btnLogin: {
    backgroundColor: "#00a680",
  },
  icon: {
    color: "#c1c1c1",
  },
});
