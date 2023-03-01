import AsyncStorage from '@react-native-async-storage/async-storage'
import { Layout } from '@ui-kitten/components'
import { Contact } from 'expo-contacts'
import { StyledComponent } from 'nativewind'
import { useEffect, useState } from 'react'

import ContactImport from './components/ContactImport/ContactImport'
import EmptyView from './components/EmptyView'
import SafeAreaView from './components/SafeAreaView'
import { PALS_CONTACTS_KEY } from './constants'

const MainScreen = () => {
  // TODO: this should include the required fields for each contact (Pick<Contact>)
  // TODO: contacts should be stored in a context
  const [palsContacts, setPalsContacts] = useState<Contact[]>([])

  useEffect(() => {
    const getPalsContactsFromStorage = async () => {
      try {
        const itemValue = await AsyncStorage.getItem(PALS_CONTACTS_KEY)

        setPalsContacts(
          typeof itemValue === 'string' ? JSON.parse(itemValue) : [],
        )
      } catch {
        // TODO: show an error message
        setPalsContacts([])
      }
    }

    getPalsContactsFromStorage()
  }, [])

  return (
    <SafeAreaView>
      <StyledComponent component={Layout} className="grow relative">
        {palsContacts.length ? null : (
          <EmptyView bodyText="You haven't imported any contacts yet." />
        )}
        <ContactImport setPalsContacts={setPalsContacts} />
      </StyledComponent>
    </SafeAreaView>
  )
}

export default MainScreen
