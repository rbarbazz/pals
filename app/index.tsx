import AsyncStorage from '@react-native-async-storage/async-storage'
import { Layout, Text } from '@ui-kitten/components'
import { StyledComponent } from 'nativewind'
import { useEffect } from 'react'

import ContactImportButton from '../src/components/ContactImportButton'
import EmptyView from '../src/components/EmptyView'
import SafeAreaView from '../src/components/SafeAreaView'
import { PALS_CONTACTS_KEY } from '../src/constants'
import { usePalsContacts } from '../src/contexts/PalsContacts'

const MainScreen = () => {
  // TODO: this should include the required fields for each contact (Pick<Contact>)
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
  }, [])

  return (
    <SafeAreaView>
      <StyledComponent component={Layout} className="flex-1">
        {palsContacts.length ? (
          <Text>You have {palsContacts.length} contacts</Text>
        ) : (
          <EmptyView bodyText="You haven't imported any contacts yet." />
        )}
        <ContactImportButton />
      </StyledComponent>
    </SafeAreaView>
  )
}

export default MainScreen
