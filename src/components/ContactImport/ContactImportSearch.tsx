import { Button, Divider, Input, Layout, List } from '@ui-kitten/components'
import { Contact } from 'expo-contacts'
import Fuse from 'fuse.js'
import { StyledComponent } from 'nativewind'
import { useCallback, useEffect, useState } from 'react'
import { Alert, ListRenderItem } from 'react-native'

import { addPalsContactToStorage } from './helpers'
import SearchIcon from '../../Icons/SearchIcon'
import { usePalsContacts } from '../../contexts/PalsContacts'
import ContactListItem from '../ContactListItem'

type Props = {
  contactsToImport: Contact[]
}

const ContactImportList = ({ contactsToImport }: Props) => {
  const [searchValue, setSearchValue] = useState('')
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([])
  const [, setPalsContacts] = usePalsContacts()

  const renderItemImportButton = useCallback(
    ({ item }: { item: Contact }) => (
      <Button
        onPress={async () => {
          const nextPalsContacts = await addPalsContactToStorage(item)

          setPalsContacts(nextPalsContacts)
          Alert.alert(
            'Success',
            `${item.name} was added to your Pals contacts.`,
            [{ text: 'OK' }],
          )
        }}
        size="small"
      >
        Import
      </Button>
    ),
    [setPalsContacts],
  )

  const renderItem: ListRenderItem<Contact> = useCallback(
    ({ item }) => (
      <ContactListItem
        item={item}
        renderItemAccessoryRight={() => renderItemImportButton({ item })}
      />
    ),
    [renderItemImportButton],
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
          accessoryRight={SearchIcon}
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
