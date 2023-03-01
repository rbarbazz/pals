import {
  Layout,
  Spinner,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components'
import { Contact } from 'expo-contacts'
import { useRouter } from 'expo-router'
import { StyledComponent } from 'nativewind'
import { useEffect, useState } from 'react'

import BackIcon from '../src/Icons/BackIcon'
import ContactImportList from '../src/components/ContactImport/ContactImportList'
import { getContacts } from '../src/components/ContactImport/helpers'
import EmptyView from '../src/components/EmptyView'
import SafeAreaView from '../src/components/SafeAreaView'

const ContactImport = () => {
  const [deviceContacts, setDeviceContacts] = useState<Contact[] | null>(null)
  const router = useRouter()

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
      {deviceContacts?.length ? (
        <ContactImportList deviceContacts={deviceContacts} />
      ) : (
        <EmptyView bodyText="You have no contacts to import." />
      )}
    </SafeAreaView>
  )
}

export default ContactImport
