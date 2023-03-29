import { Divider } from '@ui-kitten/components'

import CalendarModal from './CalendarModal'
import ContactPageHeader from './ContactPageHeader'
import ContactPageTopNavigation from './ContactPageTopNavigation'
import { PalsContact } from '../../types/PalsContact'

type TContactPageProps = PalsContact

const ContactPage = (contact: TContactPageProps) => {
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
      <ContactPageHeader
        lastInteractionTimestamp={lastInteractionTimestamp}
        lastInteractionType={lastInteractionType}
        name={name}
        uri={uri}
      />
      <CalendarModal contact={contact} />
    </>
  )
}

export default ContactPage
