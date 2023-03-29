import {
  Card,
  Divider,
  Icon,
  Layout,
  List,
  Text,
  useTheme,
} from '@ui-kitten/components'
import { StyledComponent } from 'nativewind'
import { useCallback, useMemo } from 'react'
import { ListRenderItem } from 'react-native'

import { Interaction } from '../../types/PalsContact'
import { formatLastInteractionTimestamp } from '../../utils'

type TContactPageInteractionsListProps = { interactions: Interaction[] }

const INTERACTION_TYPE_ICON_SIZE = 20

const ContactPageInteractionsList = ({
  interactions,
}: TContactPageInteractionsListProps) => {
  const theme = useTheme()
  const interactionTypeIconProps = useMemo(
    () => ({
      height: INTERACTION_TYPE_ICON_SIZE,
      width: INTERACTION_TYPE_ICON_SIZE,
    }),
    [],
  )

  const renderItem: ListRenderItem<Interaction> = useCallback(
    ({
      item: {
        lastInteractionTimestamp,
        lastInteractionType,
        lastInteractionNotes,
      },
    }) => (
      <StyledComponent
        component={Card}
        className="w-full space-y-4 my-2"
        status="basic"
      >
        <Layout>
          <Text category="label">When:</Text>
          <StyledComponent
            component={Layout}
            className="flex flex-row items-center space-x-2"
          >
            <StyledComponent component={Text} className="capitalize">
              {formatLastInteractionTimestamp(lastInteractionTimestamp)}
            </StyledComponent>
            {lastInteractionType === 'call' && (
              <Icon
                {...interactionTypeIconProps}
                fill={theme['color-primary-600']}
                name="phone"
              />
            )}
            {lastInteractionType === 'in-person' && (
              <Icon
                {...interactionTypeIconProps}
                fill={theme['color-success-600']}
                name="people"
              />
            )}
          </StyledComponent>
        </Layout>
        {lastInteractionNotes && (
          <Layout>
            <Text category="label">Notes: </Text>
            <Text>{lastInteractionNotes}</Text>
          </Layout>
        )}
      </StyledComponent>
    ),
    [interactionTypeIconProps, theme],
  )

  return (
    <StyledComponent component={Layout} className="flex-1 space-y-4">
      <Text category="h5">Timeline</Text>
      <StyledComponent
        className="bg-transparent"
        component={List<Interaction>}
        data={interactions}
        renderItem={renderItem}
        overScrollMode="always"
      />
    </StyledComponent>
  )
}

export default ContactPageInteractionsList
