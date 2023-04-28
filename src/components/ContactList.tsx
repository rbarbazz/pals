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
    if (b.interactions[0] && a.interactions[0])
      return b.interactions[0].timestamp - a.interactions[0].timestamp
    else if (!b.interactions[0] && a.interactions[0]) return -1
    else if (!a.interactions[0] && b.interactions[0]) return 1

    return a.name.localeCompare(b.name)
  })

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
