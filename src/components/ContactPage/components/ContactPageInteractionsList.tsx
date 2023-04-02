import { Layout, List, Text } from '@ui-kitten/components'
import { StyledComponent } from 'nativewind'
import { useCallback } from 'react'
import { ListRenderItem } from 'react-native'

import ContactPageInteractionsListItem from './ContactPageInteractionsListItem'
import { Interaction } from '../../../types/PalsContact'

type TContactPageInteractionsListProps = { interactions: Interaction[] }

const ContactPageInteractionsList = ({
  interactions,
}: TContactPageInteractionsListProps) => {
  const renderItem: ListRenderItem<Interaction> = useCallback(
    ({ index, item }) => (
      <ContactPageInteractionsListItem index={index} item={item} />
    ),
    [],
  )

  return (
    <StyledComponent component={Layout} className="flex-1 space-y-4">
      <Text category="h5">Timeline</Text>
      <StyledComponent
        className="bg-transparent"
        component={List<Interaction>}
        data={interactions}
        renderItem={renderItem}
      />
    </StyledComponent>
  )
}

export default ContactPageInteractionsList
