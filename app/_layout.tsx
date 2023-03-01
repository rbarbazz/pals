import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { Stack } from 'expo-router'
import { useColorScheme } from 'react-native'

import SafeAreaView from './components/SafeAreaView'

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
        <SafeAreaView>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
          </Stack>
        </SafeAreaView>
      </ApplicationProvider>
    </>
  )
}
