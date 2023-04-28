import { Icon, TopNavigation, TopNavigationAction } from '@ui-kitten/components'
import { useRouter } from 'expo-router'

import { removePalsContactToStorage } from '../../../contactsHelpers'
import { usePalsContacts } from '../../../contexts/PalsContacts'
import { PalsContact } from '../../../types/PalsContact'
import OverflowMenuWithActions from '../../OverflowMenuWithActions'

type TContactPageTopNavigationProps = {
  contactId: PalsContact['id']
}

const ContactPageTopNavigation = ({
  contactId,
}: TContactPageTopNavigationProps) => {
  const router = useRouter()
  const [, setPalsContacts] = usePalsContacts()

  return (
    <TopNavigation
      accessoryLeft={
        <TopNavigationAction
          icon={(props) => <Icon {...props} name="arrow-back" />}
          onPress={() => router.back()}
        />
      }
      accessoryRight={() => (
        <OverflowMenuWithActions
          actions={[
            {
              icon: (props) => <Icon {...props} name="trash" />,
              onPress: async () => {
                const nextPalsContacts = await removePalsContactToStorage(
                  contactId,
                )

                router.back()
                setPalsContacts(nextPalsContacts)
              },
              name: 'Remove',
            },
          ]}
        />
      )}
      alignment="center"
    />
  )
}

export default ContactPageTopNavigation
