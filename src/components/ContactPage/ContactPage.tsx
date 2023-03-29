import { Divider } from '@ui-kitten/components'

import ContactPageHeader from './ContactPageHeader'
import ContactPageTopNavigation from './ContactPageTopNavigation'
import NewInteractionModal from './NewInteractionModal'
import { PalsContact } from '../../types/PalsContact'

type TContactPageProps = PalsContact

const ContactPage = (contact: TContactPageProps) => {
  const {
    lastInteractionTimestamp,
    lastInteractionType,
    lastInteractionNote,
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
        lastInteractionNote={lastInteractionNote}
        name={name}
        uri={uri}
      />
      <NewInteractionModal contact={contact} />
    </>
  )
}

export default ContactPage
