import { GenericText } from "@components/Texts/GenericText";
import resizePixel from "@functions/resizePixel";
import colors from "@theme/colors";
import { useTakePhotoViewModel } from "@view_models/take_photo";
import { CameraView } from "expo-camera";
import { Camera, CameraRotate, X } from "phosphor-react-native";
import React, { useEffect } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { ToastProvider } from "react-native-toast-notifications";
import { style } from "./styles";

export default function TakePhoto() {
  const { footer, cameraButton, flex } = style();
  const {
    cameraRef,
    permission,
    facing,
    setFacing,
    requestPermission,
    goBack,
    takeAndSavePhoto,
  } = useTakePhotoViewModel();

  useEffect(() => {
    requestPermission();
  }, []);

  if (!permission) return <ActivityIndicator />;

  if (!permission.granted) {
    return (
      <View>
        <GenericText text="Precisamos da sua permissão para acessar a câmera" />
      </View>
    );
  }

  return (
    <ToastProvider>
      <View style={flex}>
        <CameraView
          ref={cameraRef}
          facing={facing ? "front" : "back"}
          mirror={false}
          style={flex}
        />
        <View style={footer}>
          <TouchableOpacity onPress={goBack}>
            <X size={resizePixel(28)} color={colors.WHITE} />
          </TouchableOpacity>
          <TouchableOpacity
            style={cameraButton}
            onPress={() => takeAndSavePhoto()}
          >
            <Camera size={resizePixel(40)} color={colors.BLACK} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFacing(!facing)}>
            <CameraRotate size={resizePixel(28)} color={colors.WHITE} />
          </TouchableOpacity>
        </View>
      </View>
    </ToastProvider>
  );
}
