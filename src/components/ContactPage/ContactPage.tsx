import { Divider, Layout, Text } from '@ui-kitten/components'
import { StyledComponent } from 'nativewind'

import ContactPageHeader from './ContactPageHeader'
import ContactPageInteractionsList from './ContactPageInteractionsList'
import ContactPageTopNavigation from './ContactPageTopNavigation'
import NewInteractionModal from './NewInteractionModal'
import { PalsContact } from '../../types/PalsContact'

type TContactPageProps = PalsContact

const ContactPage = (contact: TContactPageProps) => {
  const { interactions, name, id: contactId, image = {} } = contact
  const { uri = '' } = image

  return (
    <>
      <ContactPageTopNavigation contactId={contactId} />
      <Divider />
      <StyledComponent component={Layout} className="flex-1 px-6 py-12">
        <ContactPageHeader name={name} uri={uri} />
        {interactions.length ? (
          <ContactPageInteractionsList interactions={interactions} />
        ) : (
          <StyledComponent
            component={Layout}
            className="flex-1 items-center space-y-4"
          >
            <StyledComponent
              appearance="hint"
              component={Text}
              className="text-center max-w-xs"
            >
              You haven't recorded any interaction with this contact yet.
            </StyledComponent>
            <StyledComponent
              appearance="hint"
              component={Text}
              className="text-center max-w-xs"
            >
              Press the button to add your first entry.
            </StyledComponent>
          </StyledComponent>
        )}
      </StyledComponent>
      <NewInteractionModal contact={contact} />
    </>
  )
}

export default ContactPage
