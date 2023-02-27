import { Button, Layout } from '@ui-kitten/components'
import * as Contacts from 'expo-contacts'
import { StyledComponent } from 'nativewind'
import { useCallback } from 'react'
import { Alert } from 'react-native'

import PersonAddIcon from './Icons/PersonAddIcon'

const requestContactsPermissions = async () => {
  const { canAskAgain, granted } = await Contacts.getPermissionsAsync()

  if (!granted && canAskAgain) {
    const { granted } = await Contacts.requestPermissionsAsync()

    return granted
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
      Alert.alert(
        'Error',
        "Contacts permissions not granted. Please allow access to contacts from your device's settings to start adding contacts into Pals.",
        [{ text: 'OK' }],
        { cancelable: true },
      )
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
