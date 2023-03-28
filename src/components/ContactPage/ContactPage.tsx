import { Avatar, Divider, Layout, Text } from '@ui-kitten/components'
import { StyledComponent } from 'nativewind'

import CalendarModal from './CalendarModal'
import ContactPageTopNavigation from './ContactPageTopNavigation'
import { PalsContact } from '../../types/PalsContact'
import { formatLastInteractionTimestamp } from '../../utils'

type TContactPageProps = PalsContact

const ContactPage = (contact: TContactPageProps) => {
  const nowTimestamp = new Date().getTime()

  const { lastInteractionTimestamp, name, id: contactId, image = {} } = contact
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
          className="flex-1 space-y-3 items-center"
        >
          <Text>{name}</Text>
          {lastInteractionTimestamp &&
            lastInteractionTimestamp <= nowTimestamp && (
              <Text appearance="hint">
                Last in touch{' '}
                {formatLastInteractionTimestamp(lastInteractionTimestamp)}
              </Text>
            )}
        </StyledComponent>
      </StyledComponent>
      <CalendarModal contact={contact} />
    </>
  )
}

export default ContactPage
