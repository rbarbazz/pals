import { Button, Divider, Input, List } from '@ui-kitten/components'
import { Contact } from 'expo-contacts'
import Fuse from 'fuse.js'
import { useCallback, useEffect, useState } from 'react'
import { Alert } from 'react-native'

import { addPalsContactToStorage } from './helpers'
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

  const renderItem = useCallback(
    ({ item }: { item: Contact }) => (
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
        nextFilteredContacts.map((searchResult) => searchResult.item),
      )
    },
    [contactsToImport],
  )

  useEffect(() => {
    updateFilteredContacts(searchValue)
  }, [searchValue, updateFilteredContacts])

  return (
    <>
      <Input
        onChangeText={onChangeText}
        placeholder="Type to search contacts..."
        value={searchValue}
      />
      <List
        data={filteredContacts.slice(0, 10)}
        renderItem={renderItem}
        ItemSeparatorComponent={Divider}
      />
    </>
  )
}

export default ContactImportList
