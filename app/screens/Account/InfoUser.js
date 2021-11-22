import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements";
import * as firebase from "firebase";
import * as Permission from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

const InfoUser = ({ toastRef, userInfo, setLoading, setLoadingText }) => {
  const { uid, photoURL, displayName, email } = userInfo;

  const changeAvatar = async () => {
    const resultPermision = await Permission.askAsync(Permission.CAMERA_ROLL);
    const resultPermisionCamera =
      resultPermision.permissions.mediaLibrary.status;

    if (resultPermisionCamera === "denied") {
      toastRef.current.show("Es necesario aceptar los permisos de la galeria");
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (result.cancelled) {
        toastRef.current.show("Haz cerrado la seleccion de imagenes");
      } else {
        uploadImage(result.uri)
          .then(() => {
            updatePhotoURL();
          })
          .catch(() => {
            toastRef.current.show("Error al subir el avatar");
          });
      }
    }
  };

  const uploadImage = async (uri) => {
    setLoadingText("Actualizando avatar");
    setLoading(true);
    const response = await fetch(uri);
    const blob = await response.blob();

    const ref = firebase.storage().ref().child(`avatars/avatar-${uid}.jpg`);
    return ref.put(blob);
  };

  const updatePhotoURL = () => {
    firebase
      .storage()
      .ref(`avatars/avatar-${uid}.jpg`)
      .getDownloadURL()
      .then(async (response) => {
        const update = {
          photoURL: response,
        };
        await firebase.auth().currentUser.updateProfile(update);
        setLoading(false);
        toastRef.current.show("Avatar actualizado");
      })
      .catch(() => {
        setLoading(false);
        toastRef.current.show("Error al actualizar avatar");
      });
  };

  return (
    <View style={styles.viewUserInfo}>
      <Avatar
        rounded
        size="large"
        showEditButton
        onEditPress={changeAvatar}
        containerStyle={styles.userInfoAvatar}
        source={
          photoURL
            ? { uri: photoURL }
            : require("../../../assets/img/avatar-default.jpg")
        }
      />
      <View>
        <Text style={styles.displayName}>
          {displayName ? displayName : "Anonymous"}
        </Text>
        <Text>{email ? email : "Social Login"}</Text>
      </View>
    </View>
  );
};

export default InfoUser;

const styles = StyleSheet.create({
  viewUserInfo: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingTop: 30,
    paddingBottom: 30,
  },
  userInfoAvatar: {
    marginRight: 20,
  },
  displayName: {
    fontWeight: "bold",
    paddingBottom: 5,
  },
});
