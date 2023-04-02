import { Card, Icon, Layout, Text, useTheme } from '@ui-kitten/components'
import { StyledComponent } from 'nativewind'
import { useMemo } from 'react'

import { useInteractionModal } from './contexts/InteractionModal'
import { Interaction } from '../../types/PalsContact'
import { timestampToRelativeTime } from '../../utils'

const INTERACTION_TYPE_ICON_SIZE = 20

type TContactPageInteractionsListItem = {
  index: number
  item: Interaction
}

const ContactPageInteractionsListItem = ({
  index,
  item: interaction,
}: TContactPageInteractionsListItem) => {
  const { timestamp, type, notes } = interaction
  const { openModal } = useInteractionModal()
  const theme = useTheme()
  const interactionTypeIconProps = useMemo(
    () => ({
      height: INTERACTION_TYPE_ICON_SIZE,
      width: INTERACTION_TYPE_ICON_SIZE,
    }),
    [],
  )

  return (
    <StyledComponent
      className="w-full space-y-4 my-2"
      component={Card}
      status={index === 0 ? 'basic' : undefined}
      onPress={() => openModal({ interaction })}
    >
      <Layout>
        <Text category="label">When:</Text>
        <StyledComponent
          component={Layout}
          className="flex flex-row items-center space-x-2"
        >
          <StyledComponent component={Text} className="capitalize">
            {timestampToRelativeTime(timestamp)}
          </StyledComponent>
          {type === 'call' && (
            <Icon
              {...interactionTypeIconProps}
              fill={theme['color-primary-600']}
              name="phone"
            />
          )}
          {type === 'in-person' && (
            <Icon
              {...interactionTypeIconProps}
              fill={theme['color-success-600']}
              name="people"
            />
          )}
        </StyledComponent>
      </Layout>
      {notes && (
        <Layout>
          <Text category="label">Notes: </Text>
          <Text>{notes}</Text>
        </Layout>
      )}
    </StyledComponent>
  )
}

export default ContactPageInteractionsListItem
