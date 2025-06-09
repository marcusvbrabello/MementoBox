import Page from "@components/Page";
import { GenericText } from "@components/Texts/GenericText";
import { formatTimestamp } from "@functions/formatTimestamp";
import colors from "@theme/colors";
import { useDetailsViewModel } from "@view_models/details";
import React from "react";
import { Image, ScrollView, View } from "react-native";
import { style } from "./styles";

export default function Details() {
  const { container, scrollView, photo } = style();

  const { selectedPhoto } = useDetailsViewModel();

  return (
    <Page title="Detalhes" straight>
      <ScrollView showsVerticalScrollIndicator={false} style={scrollView}>
        <Image source={{ uri: selectedPhoto?.uri }} style={photo} />
        <View style={container}>
          <GenericText
            font="SEMI_BOLD"
            size="EXTRA_MEDIUM"
            lineHeight="EXTRA_MEDIUM"
            text="Informações"
          />
          <View>
            <GenericText size="SUB_MEDIUM" lineHeight="SUB_MEDIUM">
              Data e hora:{" "}
              <GenericText
                size="SUB_MEDIUM"
                lineHeight="SUB_MEDIUM"
                color={colors.GRAY_500}
                text={formatTimestamp(selectedPhoto?.timestamp)}
              />
            </GenericText>
            <GenericText size="SUB_MEDIUM" lineHeight="SUB_MEDIUM">
              Localização:{" "}
              <GenericText
                size="SUB_MEDIUM"
                lineHeight="SUB_MEDIUM"
                color={colors.GRAY_500}
                text={`${selectedPhoto.lat}, ${selectedPhoto.long}`}
              />
            </GenericText>
          </View>
        </View>
      </ScrollView>
    </Page>
  );
}
