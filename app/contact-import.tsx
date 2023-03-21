import {
  Divider,
  Icon,
  Layout,
  Spinner,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components'
import { useRouter } from 'expo-router'
import { StyledComponent } from 'nativewind'
import { useMemo } from 'react'

import ContactImportList from '../src/components/ContactImport/ContactImportSearch'
import EmptyView from '../src/components/EmptyView'
import SafeAreaView from '../src/components/SafeAreaView'
import { usePalsContacts } from '../src/contexts/PalsContacts'
import useDeviceContacts from '../src/hooks/useDeviceContacts'

const ContactImport = () => {
  const deviceContacts = useDeviceContacts(
    'to start adding contacts into Pals.',
  )
  const [palsContacts] = usePalsContacts()
  const router = useRouter()
  // Exclude contacts that are already imported
  const contactsToImport = useMemo(
    () =>
      deviceContacts?.filter(
        (deviceContact) =>
          !palsContacts.find(
            (palsContact) => palsContact.id === deviceContact.id,
          ),
      ),
    [deviceContacts, palsContacts],
  )

  return (
    <SafeAreaView>
      {deviceContacts === null ? (
        <StyledComponent
          component={Layout}
          className="flex-1 justify-center items-center"
        >
          <Spinner size="giant" />
        </StyledComponent>
      ) : (
        <>
          <TopNavigation
            accessoryLeft={
              <TopNavigationAction
                icon={(props) => <Icon {...props} name="arrow-back" />}
                onPress={() => router.back()}
              />
            }
            alignment="center"
            title="Contact Import"
          />
          <Divider />
          {contactsToImport?.length ? (
            <ContactImportList contactsToImport={contactsToImport} />
          ) : (
            <EmptyView bodyText="You have no contacts to import." />
          )}
        </>
      )}
    </SafeAreaView>
  )
}

export default ContactImport
