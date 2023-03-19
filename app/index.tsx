import AsyncStorage from '@react-native-async-storage/async-storage'
import { Layout } from '@ui-kitten/components'
import { StyledComponent } from 'nativewind'

import ContactImportButton from '../src/components/ContactImportButton'
import ContactList from '../src/components/ContactList'
import EmptyView from '../src/components/EmptyView'
import SafeAreaView from '../src/components/SafeAreaView'
import { usePalsContacts } from '../src/contexts/PalsContacts'
import useLoadPalsContacts from '../src/hooks/useLoadPalsContacts'
import useSyncPalsContacts from '../src/hooks/useSyncPalsContacts'

const MainScreen = () => {
  const [palsContacts] = usePalsContacts()
  useLoadPalsContacts()
  useSyncPalsContacts()

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
