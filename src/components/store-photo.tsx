import { ThemedText } from "@/components/themed-text";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Button, Linking } from "react-native";

export function StorePhoto() {
  const [photo, setPhoto] = useState("");
  const [denied, setDenied] = useState(false);

  async function take() {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    setDenied(!granted);
    if (!granted) return;
    const result = await ImagePicker.launchCameraAsync();
    if (!result.canceled) setPhoto(result.assets[0].uri);
  }

  return (
    <>
      <Button title="Take a store photo" onPress={take} />
      {photo !== "" && (
        <Image source={{ uri: photo }} style={{ height: 220 }} />
      )}
      {denied && <ThemedText>Camera is off for this app.</ThemedText>}
      {denied && (
        <Button title="Open settings" onPress={() => Linking.openSettings()} />
      )}
    </>
  );
}
