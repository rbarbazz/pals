import { Button, Layout, Modal, useTheme } from '@ui-kitten/components'
import { Contact } from 'expo-contacts'
import { StyledComponent } from 'nativewind'
import { useCallback, useState } from 'react'

import { getContacts } from './helpers'
import EmptyView from '../EmptyView'
import PersonAddIcon from '../Icons/PersonAddIcon'

const ContactImport = () => {
  const theme = useTheme()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [contacts, setContacts] = useState<Contact[]>([])
  const onPress = useCallback(async () => {
    const _contacts = await getContacts()
    setContacts(_contacts)
    setIsModalVisible(true)
  }, [])

  return (
    <>
      <StyledComponent className="absolute bottom-8 right-8" component={Layout}>
        <Button accessoryRight={PersonAddIcon} onPress={onPress}>
          Add
        </Button>
      </StyledComponent>
      <Modal
        visible={isModalVisible}
        backdropStyle={{ backgroundColor: theme['background-basic-color-1'] }}
      >
        {contacts.length ? null : ( // TODO: List contacts to import (exclude the ones that are already imported)
          <EmptyView
            bodyText="You have no contacts to import."
            buttonText="Close"
            onPress={() => setIsModalVisible(false)}
          />
        )}
      </Modal>
    </>
  )
}

export default ContactImport
