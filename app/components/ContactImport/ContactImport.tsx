import { Button, Layout, Modal, useTheme } from '@ui-kitten/components'
import { Contact } from 'expo-contacts'
import { StyledComponent } from 'nativewind'
import { useCallback, useState } from 'react'

import ContactImportList from './ContactImportList'
import { getContacts } from './helpers'
import EmptyView from '../EmptyView'
import PersonAddIcon from '../Icons/PersonAddIcon'
import SafeAreaView from '../SafeAreaView'

const ContactImport = ({
  setPalsContacts,
}: {
  setPalsContacts: React.Dispatch<React.SetStateAction<Contact[]>>
}) => {
  const theme = useTheme()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [contacts, setContacts] = useState<Contact[]>([])
  const openContactsToImportListModal = useCallback(async () => {
    const _contacts = await getContacts()
    setContacts(_contacts)
    setIsModalVisible(true)
  }, [])

  return (
    <>
      <StyledComponent className="absolute bottom-8 right-8" component={Layout}>
        <Button
          accessoryRight={PersonAddIcon}
          onPress={openContactsToImportListModal}
        >
          Add
        </Button>
      </StyledComponent>
      <StyledComponent
        component={Modal}
        className="w-screen h-screen"
        visible={isModalVisible}
        backdropStyle={{ backgroundColor: theme['background-basic-color-1'] }}
      >
        <SafeAreaView>
          {contacts.length ? (
            <ContactImportList
              contacts={contacts}
              setIsModalVisible={setIsModalVisible}
              setPalsContacts={setPalsContacts}
            />
          ) : (
            <EmptyView
              bodyText="You have no contacts to import."
              buttonText="Close"
              onPress={() => setIsModalVisible(false)}
            />
          )}
        </SafeAreaView>
      </StyledComponent>
    </>
  )
}

export default ContactImport
