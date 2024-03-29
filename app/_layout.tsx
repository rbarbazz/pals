import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { Stack } from 'expo-router'
import { StrictMode } from 'react'
import { useColorScheme } from 'react-native'

import { Provider as PalsContactsProvider } from '../src/contexts/PalsContacts'
import { Provider as PalsContactsListProvider } from '../src/contexts/PalsContactsList'

export const unstable_settings = {
  initialRouteName: 'index',
}

export default function RootLayout() {
  const colorScheme = useColorScheme()

  return (
    <StrictMode>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={colorScheme === 'dark' ? eva.dark : eva.light}
      >
        <PalsContactsProvider>
          <PalsContactsListProvider>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen
                name="contact-import"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="contact/[id]"
                options={{ headerShown: false }}
              />
            </Stack>
          </PalsContactsListProvider>
        </PalsContactsProvider>
      </ApplicationProvider>
    </StrictMode>
  )
}
