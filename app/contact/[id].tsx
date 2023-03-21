import {
  Divider,
  Icon,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components'
import { usePathname, useRouter } from 'expo-router'
import { useMemo } from 'react'

import SafeAreaView from '../../src/components/SafeAreaView'
import { usePalsContacts } from '../../src/contexts/PalsContacts'

const ContactPage = () => {
  const pathname = usePathname()
  const router = useRouter()
  const [palsContacts] = usePalsContacts()
  const contactId = pathname.replace('/contact/', '')
  const selectedContact = useMemo(
    () => palsContacts.find((palsContact) => palsContact.id === contactId),
    [contactId, palsContacts],
  )

  return (
    <SafeAreaView>
      <TopNavigation
        accessoryLeft={
          <TopNavigationAction
            icon={(props) => <Icon {...props} name="arrow-back" />}
            onPress={() => router.back()}
          />
        }
        alignment="center"
        title={selectedContact?.name}
      />
      <Divider />
    </SafeAreaView>
  )
}

export default ContactPage
