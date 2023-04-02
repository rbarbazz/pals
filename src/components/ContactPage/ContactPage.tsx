import { Divider, Layout } from '@ui-kitten/components'
import { StyledComponent } from 'nativewind'

import ContactPageEmptyView from './components/ContactPageEmptyView'
import ContactPageHeader from './components/ContactPageHeader'
import ContactPageInteractionsList from './components/ContactPageInteractionsList'
import ContactPageTopNavigation from './components/ContactPageTopNavigation'
import InteractionModal from './components/InteractionModal'
import NewInteractionButton from './components/NewInteractionButton'
import {
  useInteractionModal,
  Provider as InteractionModalProvider,
} from './contexts/InteractionModal'
import { PalsContact } from '../../types/PalsContact'

type TContactPageProps = PalsContact

const ContactPage = (contact: TContactPageProps) => {
  const { openModal, closeModal, modalOptions } = useInteractionModal()
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
      {modalOptions && (
        <InteractionModal closeModal={closeModal} {...modalOptions} />
      )}
      <NewInteractionButton onPress={() => openModal({})} />
    </>
  )
}

const Wrapper = (contact: TContactPageProps) => (
  <InteractionModalProvider contact={contact}>
    <ContactPage {...contact} />
  </InteractionModalProvider>
)

export default Wrapper
