import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTitle: "none",
      }}
    >
      <Stack.Screen name="views/album" />
      <Stack.Screen name="views/details" />
      <Stack.Screen name="views/take_photo" />
    </Stack>
  );
}
