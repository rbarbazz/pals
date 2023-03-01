import { Button, Divider, List } from '@ui-kitten/components'
import { Contact } from 'expo-contacts'

import { addPalsContactToStorage } from './helpers'
import CheckMarkCircleIcon from '../../Icons/CheckMarkCircleIcon'
import { usePalsContacts } from '../../contexts/PalsContacts'
import ContactListItem from '../ContactListItem'

type Props = {
  deviceContacts: Contact[]
}

const ContactImportList = ({ deviceContacts }: Props) => {
  const [palsContacts, setPalsContacts] = usePalsContacts()

  const renderItemImportButton = (item: Contact) => (
    <Button
      onPress={async () => {
        const nextPalsContacts = await addPalsContactToStorage(item)

        setPalsContacts(nextPalsContacts)
      }}
      size="small"
    >
      Import
    </Button>
  )
  const renderItem = ({ item }: { item: Contact }) => (
    <ContactListItem
      item={item}
      renderItemRightAccessory={
        palsContacts.find((palsContact) => palsContact.id === item.id)
          ? CheckMarkCircleIcon
          : () => renderItemImportButton(item)
      }
    />
  )

  return (
    <List
      data={deviceContacts} // TODO: Exclude contacts that are already imported
      renderItem={renderItem}
      ItemSeparatorComponent={Divider}
    />
  )
}

export default ContactImportList
