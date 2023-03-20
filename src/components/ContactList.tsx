import { Divider, List, TopNavigation } from '@ui-kitten/components'
import { StyledComponent } from 'nativewind'
import { useCallback } from 'react'
import { ListRenderItem } from 'react-native'

import ContactListItem from './ContactListItem'
import { usePalsContacts } from '../contexts/PalsContacts'
import { PalsContact } from '../types/PalsContact'

const ContactList = () => {
  const [palsContacts] = usePalsContacts()
  const sortedPalsContacts = [...palsContacts].sort((a, b) => {
    if (b.lastInteractionTimestamp && a.lastInteractionTimestamp)
      return b.lastInteractionTimestamp - a.lastInteractionTimestamp
    else if (!b.lastInteractionTimestamp && a.lastInteractionTimestamp)
      return -1
    else if (!a.lastInteractionTimestamp && b.lastInteractionTimestamp) return 1

    return a.name.localeCompare(b.name)
  })

  const renderItem: ListRenderItem<PalsContact> = useCallback(
    ({ item }) => <ContactListItem item={item} />,
    [],
  )

  return (
    <>
      <TopNavigation alignment="center" title="Your Relationships" />
      <Divider />
      <StyledComponent
        className="bg-transparent"
        component={List<PalsContact>}
        data={sortedPalsContacts}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
      />
    </>
  )
}

export default ContactList
