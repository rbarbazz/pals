import * as eva from '@eva-design/eva'
import { ApplicationProvider } from '@ui-kitten/components'
import { Stack } from 'expo-router'
import { SafeAreaView } from 'react-native'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  initialRouteName: 'index',
}

export default function RootLayout() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaView>
    </ApplicationProvider>
  )
}
