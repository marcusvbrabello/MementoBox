import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTitle: "none",
      }}
    >
      <Stack.Screen name="views/album/index" />
      <Stack.Screen name="views/details/index" />
      <Stack.Screen name="views/take_photo/index" />
    </Stack>
  );
}
