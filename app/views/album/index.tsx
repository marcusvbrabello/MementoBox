import Page from "@components/Page";
import { GenericText } from "@components/Texts/GenericText";
import { loadPhotosFromFolder } from "@functions/loadPhotosFromFolder";
import resizePixel from "@functions/resizePixel";
import colors from "@theme/colors";
import { useAlbumViewModel } from "@view_models/album";
import { CameraPlus } from "phosphor-react-native";
import React, { useEffect } from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { style } from "./styles";

export default function Album() {
  const { container, photoItem, cameraButton, list, columnWrapperStyle } =
    style();

  const { data, openDetails, openCamera } = useAlbumViewModel();

  useEffect(() => {
    loadPhotosFromFolder();
  }, []);

  const renderItem = ({ item }: { item: any }) => {
    if (item.id === "camera") {
      return (
        <TouchableOpacity style={cameraButton} onPress={() => openCamera()}>
          <CameraPlus size={resizePixel(36)} color={colors.BLACK} />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity onPress={() => openDetails(item)}>
        <Image source={{ uri: item.uri }} style={photoItem} />
      </TouchableOpacity>
    );
  };

  return (
    <Page title="Álbum" goBackScreen={false}>
      <View style={container}>
        <View>
          <GenericText
            font="SEMI_BOLD"
            size="EXTRA_MEDIUM"
            lineHeight="EXTRA_MEDIUM"
            text="Suas fotos"
          />
          <GenericText
            size="SUB_MEDIUM"
            lineHeight="SUB_MEDIUM"
            color={colors.GRAY_400}
            text="Confira e adicione fotos à sua galeria!"
          />
        </View>
        <FlatList
          data={data}
          renderItem={renderItem}
          numColumns={3}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          columnWrapperStyle={columnWrapperStyle}
          style={list}
        />
      </View>
    </Page>
  );
}
