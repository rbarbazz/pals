import { Divider, Layout } from '@ui-kitten/components'
import { StyledComponent } from 'nativewind'
import { useState } from 'react'

import ContactPageEmptyView from './ContactPageEmptyView'
import ContactPageHeader from './ContactPageHeader'
import ContactPageInteractionsList from './ContactPageInteractionsList'
import ContactPageTopNavigation from './ContactPageTopNavigation'
import InteractionModal from './InteractionModal'
import NewInteractionButton from './NewInteractionButton'
import { PalsContact } from '../../types/PalsContact'

type TContactPageProps = PalsContact

const ContactPage = (contact: TContactPageProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
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
          <ContactPageEmptyView />
        )}
      </StyledComponent>
      <InteractionModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        contact={contact}
      />
      <NewInteractionButton onPress={() => setIsModalOpen(true)} />
    </>
  )
}

export default ContactPage
