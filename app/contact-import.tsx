import {
  Divider,
  Layout,
  Spinner,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components'
import { Contact } from 'expo-contacts'
import { useRouter } from 'expo-router'
import { StyledComponent } from 'nativewind'
import { useEffect, useMemo, useState } from 'react'

import BackIcon from '../src/Icons/BackIcon'
import ContactImportList from '../src/components/ContactImport/ContactImportSearch'
import { getContacts } from '../src/components/ContactImport/helpers'
import EmptyView from '../src/components/EmptyView'
import SafeAreaView from '../src/components/SafeAreaView'
import { usePalsContacts } from '../src/contexts/PalsContacts'

const ContactImport = () => {
  const [deviceContacts, setDeviceContacts] = useState<Contact[] | null>(null)
  const [palsContacts] = usePalsContacts()
  const router = useRouter()
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

  useEffect(() => {
    const initialGetContacts = async () => {
      const _contacts = await getContacts()

      setDeviceContacts(_contacts)
    }

    initialGetContacts()
  }, [])

  if (deviceContacts === null)
    return (
      <SafeAreaView>
        <StyledComponent
          component={Layout}
          className="flex-1 justify-center items-center"
        >
          <Spinner size="giant" />
        </StyledComponent>
      </SafeAreaView>
    )

  return (
    <SafeAreaView>
      <TopNavigation
        accessoryLeft={
          <TopNavigationAction
            icon={<BackIcon />}
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
    </SafeAreaView>
  )
}

export default ContactImport
