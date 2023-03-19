import AsyncStorage from '@react-native-async-storage/async-storage'
import { Layout } from '@ui-kitten/components'
import { StyledComponent } from 'nativewind'
import { useEffect } from 'react'

import ContactImportButton from '../src/components/ContactImportButton'
import ContactList from '../src/components/ContactList'
import EmptyView from '../src/components/EmptyView'
import SafeAreaView from '../src/components/SafeAreaView'
import { PALS_CONTACTS_KEY } from '../src/constants'
import { usePalsContacts } from '../src/contexts/PalsContacts'

const MainScreen = () => {
  const [palsContacts, setPalsContacts] = usePalsContacts()

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
  }, [setPalsContacts])

  return (
    <SafeAreaView>
      <StyledComponent component={Layout} className="flex-1">
        {palsContacts.length ? (
          <ContactList />
        ) : (
          <EmptyView bodyText="You haven't imported any contacts yet." />
        )}
        <ContactImportButton />
      </StyledComponent>
    </SafeAreaView>
  )
}

export default MainScreen
