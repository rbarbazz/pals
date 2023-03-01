import {
  Button,
  Divider,
  List,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components'
import { Contact } from 'expo-contacts'

import { addPalsContactToStorage } from './helpers'
import ContactListItem from '../ContactListItem'
import BackIcon from '../Icons/BackIcon'

type Props = {
  contacts: Contact[]
  setPalsContacts: React.Dispatch<React.SetStateAction<Contact[]>>
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const ContactImportList = ({
  contacts,
  setPalsContacts,
  setIsModalVisible,
}: Props) => {
  const renderItemRightAccessory = (item: Contact) => (
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
      renderItemRightAccessory={() => renderItemRightAccessory(item)}
    />
  )
  return (
    <>
      <TopNavigation
        accessoryLeft={
          <TopNavigationAction
            icon={<BackIcon />}
            onPress={() => setIsModalVisible(false)}
          />
        }
      />
      <List
        data={contacts} // TODO: Exclude contacts that are already imported
        renderItem={renderItem}
        ItemSeparatorComponent={Divider}
      />
    </>
  )
}

export default ContactImportList
