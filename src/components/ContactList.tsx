import { Divider, List, TopNavigation } from '@ui-kitten/components'
import { StyledComponent } from 'nativewind'
import { useCallback } from 'react'
import { ListRenderItem } from 'react-native'

import ContactListItem from './ContactListItem'
import { usePalsContacts } from '../contexts/PalsContacts'
import { PalsContact } from '../types/PalsContact'

const ContactList = () => {
  const [palsContacts] = usePalsContacts()

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
        data={palsContacts}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
      />
    </>
  )
}

export default ContactList
