import {
  Avatar,
  Divider,
  Icon,
  Layout,
  Text,
  useTheme,
} from '@ui-kitten/components'
import { StyledComponent } from 'nativewind'

import CalendarModal from './CalendarModal'
import ContactPageTopNavigation from './ContactPageTopNavigation'
import { PalsContact } from '../../types/PalsContact'
import { formatLastInteractionTimestamp } from '../../utils'

type TContactPageProps = PalsContact

const INTERACTION_TYPE_ICON_SIZE = 20

const ContactPage = (contact: TContactPageProps) => {
  const theme = useTheme()
  const interactionTypeIconProps = {
    fill: theme['text-hint-color'],
    height: INTERACTION_TYPE_ICON_SIZE,
    width: INTERACTION_TYPE_ICON_SIZE,
  }
  const nowTimestamp = new Date().getTime()

  const {
    lastInteractionTimestamp,
    lastInteractionType,
    name,
    id: contactId,
    image = {},
  } = contact
  const { uri = '' } = image

  return (
    <>
      <ContactPageTopNavigation contactId={contactId} />
      <Divider />
      <StyledComponent
        component={Layout}
        className="flex-1 space-y-6 p-12 items-center"
      >
        {uri && <Avatar source={{ uri }} size="giant" />}
        <StyledComponent
          component={Layout}
          className="flex-1 space-y-4 items-center"
        >
          <Text>{name}</Text>
          {lastInteractionTimestamp &&
            lastInteractionTimestamp <= nowTimestamp && (
              <StyledComponent
                component={Layout}
                className="flex flex-row items-center space-x-2"
              >
                <Text appearance="hint">
                  Last in touch{' '}
                  {formatLastInteractionTimestamp(lastInteractionTimestamp)}
                </Text>
                {lastInteractionType === 'call' && (
                  <Icon {...interactionTypeIconProps} name="phone" />
                )}
                {lastInteractionType === 'in-person' && (
                  <Icon {...interactionTypeIconProps} name="people" />
                )}
              </StyledComponent>
            )}
        </StyledComponent>
      </StyledComponent>
      <CalendarModal contact={contact} />
    </>
  )
}

export default ContactPage
