import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { Stack } from 'expo-router'
import { SafeAreaView, useColorScheme } from 'react-native'

export const unstable_settings = {
  initialRouteName: 'index',
}

export default function RootLayout() {
  const colorScheme = useColorScheme()

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={colorScheme === 'dark' ? eva.dark : eva.light}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
          </Stack>
        </SafeAreaView>
      </ApplicationProvider>
    </>
  )
}
