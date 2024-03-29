import {
  Button,
  Divider,
  Icon,
  Input,
  Layout,
  List,
} from '@ui-kitten/components'
import { Contact } from 'expo-contacts'
import Fuse from 'fuse.js'
import { StyledComponent } from 'nativewind'
import { useCallback, useEffect, useState } from 'react'
import { Alert, ListRenderItem } from 'react-native'

import { DEFAULT_ALERT_BUTTON_TEXT } from '../../constants'
import { addPalsContactToStorage } from '../../contactsHelpers'
import { usePalsContacts } from '../../contexts/PalsContacts'
import {
  palsContactsLists,
  usePalsContactsList,
} from '../../contexts/PalsContactsList'
import ContactListItem from '../ContactListItem'

type Props = {
  contactsToImport: Contact[]
}

const ContactImportList = ({ contactsToImport }: Props) => {
  const [selectedPalsContactListIndex] = usePalsContactsList()
  const selectedPalsContactListName =
    palsContactsLists[selectedPalsContactListIndex]
  const [searchValue, setSearchValue] = useState('')
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([])
  const [, setPalsContacts] = usePalsContacts()

  const renderItem: ListRenderItem<Contact> = useCallback(
    ({ item }) => (
      <ContactListItem
        item={item}
        renderItemAccessoryRight={() => (
          <Button
            onPress={async () => {
              try {
                const nextPalsContacts = await addPalsContactToStorage(
                  item,
                  palsContactsLists[selectedPalsContactListIndex],
                )

                setPalsContacts(nextPalsContacts)
                Alert.alert(
                  'Success',
                  `${item.name} was added to your "${selectedPalsContactListName}" Pals contact list.`,
                  [{ text: DEFAULT_ALERT_BUTTON_TEXT }],
                )
              } catch {
                Alert.alert(
                  'Error',
                  `Error adding ${item.name} to your Pals contacts.`,
                  [{ text: DEFAULT_ALERT_BUTTON_TEXT }],
                )
              }
            }}
            size="small"
          >
            Import
          </Button>
        )}
      />
    ),
    [
      selectedPalsContactListIndex,
      selectedPalsContactListName,
      setPalsContacts,
    ],
  )

  const onChangeText = useCallback((nextTextValue: string) => {
    setSearchValue(nextTextValue)
  }, [])

  const updateFilteredContacts = useCallback(
    (pattern: string) => {
      const fuse = new Fuse(contactsToImport, { keys: ['name'] })
      const nextFilteredContacts = fuse.search(pattern)

      setFilteredContacts(
        nextFilteredContacts
          .map((searchResult) => searchResult.item)
          .slice(0, 10),
      )
    },
    [contactsToImport],
  )

  useEffect(() => {
    updateFilteredContacts(searchValue)
  }, [searchValue, updateFilteredContacts])

  return (
    <>
      <StyledComponent component={Layout} className="p-4">
        <Input
          accessoryRight={(props) => <Icon {...props} name="search" />}
          onChangeText={onChangeText}
          placeholder="Type to search contacts..."
          size="large"
          value={searchValue}
        />
      </StyledComponent>
      {!!filteredContacts?.length && (
        <StyledComponent
          className="bg-transparent"
          component={List<Contact>}
          data={filteredContacts}
          ItemSeparatorComponent={Divider}
          renderItem={renderItem}
        />
      )}
    </>
  )
}

export default ContactImportList
