import { GenericText } from "@components/Texts/GenericText";
import resizePixel from "@functions/resizePixel";
import colors from "@theme/colors";
import { CaretLeft } from "phosphor-react-native";
import { TouchableOpacity, View } from "react-native";
import { ToastProvider } from "react-native-toast-notifications";
import StatusBar from "../StatusBar";
import { style } from "./styles";
import { PageProps } from "./types";
import usePageViewModel from "./view_model";

export default function Page({
  title,
  children,
  goBackHome,
  goBackScreen = true,
  showHelpIcon = false,
  backFunction,
  height = "auto",
  straight = false
}: PageProps) {
  const { goBack } = usePageViewModel();

  const { header, container, button, textHeaderContent, spacer } = style({
    textHeaderContent: { paddingHorizontal: goBackHome || showHelpIcon },
    header: { height, straight },
    spacer: { orientation: "vertical", size: 42 },
  });

  return (
    <ToastProvider>
      <StatusBar />
      <View style={container}>
        <View style={header}>
          {goBackScreen ? (
            <TouchableOpacity
              style={button}
              onPress={() => (backFunction ? backFunction() : goBack())}
            >
              <CaretLeft
                size={resizePixel(20)}
                color={colors.WHITE}
                weight="bold"
              />
            </TouchableOpacity>
          ) : (
            <View style={spacer} />
          )}
          <View style={textHeaderContent}>
            <GenericText
              font="SEMI_BOLD"
              size="EXTRA_MEDIUM"
              lineHeight="LARGE"
              color={colors.WHITE}
              text={title}
            />
          </View>
          <View style={spacer} />
        </View>
        {children}
      </View>
    </ToastProvider>
  );
}
