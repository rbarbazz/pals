import {
  Avatar,
  Card,
  Icon,
  Layout,
  Text,
  useTheme,
} from '@ui-kitten/components'
import { Image } from 'expo-contacts'
import { StyledComponent } from 'nativewind'

import { Interaction, PalsContact } from '../../types/PalsContact'
import { formatLastInteractionTimestamp } from '../../utils'

type TContactPageHeaderProps = {
  lastInteractionTimestamp?: Interaction['lastInteractionTimestamp']
  lastInteractionType?: Interaction['lastInteractionType']
  lastInteractionNote?: Interaction['lastInteractionNote']
  name: PalsContact['name']
  uri?: Image['uri']
}

const INTERACTION_TYPE_ICON_SIZE = 20

const ContactPageHeader = ({
  lastInteractionTimestamp,
  lastInteractionType,
  lastInteractionNote,
  name,
  uri,
}: TContactPageHeaderProps) => {
  const theme = useTheme()
  const interactionTypeIconProps = {
    fill: theme['text-primary-color'],
    height: INTERACTION_TYPE_ICON_SIZE,
    width: INTERACTION_TYPE_ICON_SIZE,
  }
  const nowTimestamp = new Date().getTime()
  const hasPastLastInteraction = !!(
    lastInteractionTimestamp && lastInteractionTimestamp <= nowTimestamp
  )
  const shouldShowLastInteractionCard =
    hasPastLastInteraction || !!lastInteractionNote

  return (
    <StyledComponent
      component={Layout}
      className="flex-1 space-y-6 px-6 py-12 items-center"
    >
      {uri && <Avatar source={{ uri }} size="giant" />}
      <StyledComponent
        component={Layout}
        className="flex-1 space-y-12 items-center w-full"
      >
        <Text>{name}</Text>
        {shouldShowLastInteractionCard && (
          <StyledComponent component={Card} className="w-full space-y-4">
            {hasPastLastInteraction && (
              <Layout>
                <Text category="label">Last in touch: </Text>
                <StyledComponent
                  component={Layout}
                  className="flex flex-row items-center space-x-2"
                >
                  <StyledComponent component={Text} className="capitalize">
                    {formatLastInteractionTimestamp(lastInteractionTimestamp)}
                  </StyledComponent>
                  {lastInteractionType === 'call' && (
                    <Icon {...interactionTypeIconProps} name="phone" />
                  )}
                  {lastInteractionType === 'in-person' && (
                    <Icon {...interactionTypeIconProps} name="people" />
                  )}
                </StyledComponent>
              </Layout>
            )}
            {lastInteractionNote && (
              <Layout>
                <Text category="label">Note: </Text>
                <Text>{lastInteractionNote}</Text>
              </Layout>
            )}
          </StyledComponent>
        )}
      </StyledComponent>
    </StyledComponent>
  )
}

export default ContactPageHeader
