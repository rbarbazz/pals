import {
  Divider,
  Icon,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components'
import { usePathname, useRouter } from 'expo-router'
import { useMemo } from 'react'

import ContactPage from '../../src/components/ContactPage/ContactPage'
import EmptyView from '../../src/components/EmptyView'
import SafeAreaView from '../../src/components/SafeAreaView'
import { usePalsContacts } from '../../src/contexts/PalsContacts'

const ContactPageLayout = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [palsContacts] = usePalsContacts()
  const contactId = pathname.replace('/contact/', '')
  const selectedContact = useMemo(
    () => palsContacts.find((palsContact) => palsContact.id === contactId),
    [contactId, palsContacts],
  )

  return (
    <SafeAreaView>
      {selectedContact ? (
        <ContactPage {...selectedContact} />
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
          />
          <Divider />
          <EmptyView bodyText="Could't find selected contact." />
        </>
      )}
    </SafeAreaView>
  )
}

export default ContactPageLayout
