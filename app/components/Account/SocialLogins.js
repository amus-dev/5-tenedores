import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Icon } from "react-native-elements";
import * as Google from "expo-google-app-auth";
import { useNavigation } from "@react-navigation/native";
import Loading from "../Loading";

const SocialLogins = ({ toastRef }) => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleLoginGoogleAuth = () => {
    setLoading(true);
    const config = {
      iosClientId: `831203843205-2oadm3couliir6veua3h9a88eigv8e3v.apps.googleusercontent.com`,
      androidClientId: `831203843205-dp12c2nrepl4jb9n657pai4qbj9esm9g.apps.googleusercontent.com`,
      scopes: ["profile", "email"],
    };
    Google.logInAsync(config)
      .then((result) => {
        const { type, user } = result;
        if (type === "success") {
          setLoading(false);
          navigation.navigate("account");
          console.log("success sigin");
          console.log(user);
        } else {
          setLoading(false);
          toastRef.current.show("El login ha sido cancelado");
        }
      })
      .catch(() => {
        setLoading(false);
        toastRef.current.show("Error inicio de sesión intente mas tarde");
      });
  };

  return (
    <View style={styles.viewSocialLogins}>
      <Button
        buttonStyle={styles.btnSocialGoogle}
        icon={
          <Icon
            iconStyle={styles.iconStyle}
            name="google"
            type="material-community"
            color="#fff"
            size={18}
          />
        }
        title="Google"
        onPress={() => handleLoginGoogleAuth()}
      />
      <Loading text="Cargando" isVisible={loading} />
    </View>
  );
};

export default SocialLogins;

const styles = StyleSheet.create({
  viewSocialLogins: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  btnSocialGoogle: {
    width: "100%",
    backgroundColor: "#dd4b39",
  },
  iconStyle: {
    marginRight: 8,
  },
});
