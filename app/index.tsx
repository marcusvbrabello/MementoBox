
import { fonts } from "@constants/fonts";
import Album from "@views/album";
import { useFonts } from "expo-font";

export default function App() {
  const [loaded, error] = useFonts(fonts);

  if (!loaded && !error) {
    return null;
  }

  return <Album />;
}
