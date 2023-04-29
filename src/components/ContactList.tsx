import { Divider, List } from '@ui-kitten/components'
import { StyledComponent } from 'nativewind'
import { useCallback, useMemo } from 'react'
import { ListRenderItem } from 'react-native'

import ContactListItem from './ContactListItem'
import { usePalsContacts } from '../contexts/PalsContacts'
import {
  palsContactsLists,
  usePalsContactsList,
} from '../contexts/PalsContactsList'
import { PalsContact } from '../types/PalsContact'

const ContactList = () => {
  const [selectedPalsContactListIndex] = usePalsContactsList()
  const selectedPalsContactListName =
    palsContactsLists[selectedPalsContactListIndex]
  const [palsContacts] = usePalsContacts()
  const filteredPalsContacts = useMemo(
    () =>
      palsContacts.filter(
        (palsContact) => palsContact.listName === selectedPalsContactListName,
      ),
    [palsContacts, selectedPalsContactListName],
  )
  const sortedPalsContacts = useMemo(
    () =>
      [...filteredPalsContacts].sort((a, b) => {
        if (b.interactions[0] && a.interactions[0])
          return b.interactions[0].timestamp - a.interactions[0].timestamp
        else if (!b.interactions[0] && a.interactions[0]) return -1
        else if (!a.interactions[0] && b.interactions[0]) return 1

        return a.name.localeCompare(b.name)
      }),
    [filteredPalsContacts],
  )

  const renderItem: ListRenderItem<PalsContact> = useCallback(
    ({ item }) => <ContactListItem item={item} />,
    [],
  )

  return (
    <StyledComponent
      className="bg-transparent"
      component={List<PalsContact>}
      data={sortedPalsContacts}
      ItemSeparatorComponent={Divider}
      renderItem={renderItem}
    />
  )
}

export default ContactList
