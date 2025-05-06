import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ 
      headerShown: false,
      contentStyle: { backgroundColor: '#121212' }
    }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
    </Stack>
  );
}