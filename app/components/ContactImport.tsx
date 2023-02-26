import { Button, Layout } from '@ui-kitten/components'
import * as Contacts from 'expo-contacts'
import { StyledComponent } from 'nativewind'
import { useCallback } from 'react'

import PersonAddIcon from './Icons/PersonAddIcon'

const requestContactsPermissions = async () => {
  const { canAskAgain, granted } = await Contacts.getPermissionsAsync()

  if (!granted && canAskAgain) {
    const { granted } = await Contacts.requestPermissionsAsync()

    if (!granted) return false
  }

  return granted
}

const ContactImport = () => {
  const getContacts = useCallback(async () => {
    const hasContactsPermissions = await requestContactsPermissions()

    if (hasContactsPermissions) {
      const { data } = await Contacts.getContactsAsync({
        sort: Contacts.SortTypes.FirstName,
      })

      if (data.length > 0) {
        console.log(data.length)
      }
    } else {
      // TODO: show an error message directing the user to their settings
    }
  }, [])

  return (
    <StyledComponent className="absolute bottom-8 right-8" component={Layout}>
      <StyledComponent
        accessoryRight={PersonAddIcon}
        component={Button}
        onPress={getContacts}
      >
        Add
      </StyledComponent>
    </StyledComponent>
  )
}

export default ContactImport
