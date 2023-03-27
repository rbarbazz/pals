import { Avatar, Divider, Layout, Text } from '@ui-kitten/components'
import { formatDistanceToNow } from 'date-fns'
import { StyledComponent } from 'nativewind'

import ContactPageTopNavigation from './ContactPageTopNavigation'
import { PalsContact } from '../../types/PalsContact'

type TContactPageProps = PalsContact

const ContactPage = ({
  lastInteractionTimestamp,
  name,
  id: contactId,
  image = {},
}: TContactPageProps) => {
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
          {lastInteractionTimestamp && (
            <Text appearance="hint">
              Last in touch{' '}
              {formatDistanceToNow(new Date(lastInteractionTimestamp), {
                addSuffix: true,
              })}
            </Text>
          )}
        </StyledComponent>
      </StyledComponent>
    </>
  )
}

export default ContactPage
