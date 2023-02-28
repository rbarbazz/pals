import * as Contacts from 'expo-contacts'
import { Alert } from 'react-native'

const requestContactsPermissions = async () => {
  const { canAskAgain, granted } = await Contacts.getPermissionsAsync()

  if (!granted && canAskAgain) {
    const { granted } = await Contacts.requestPermissionsAsync()

    return granted
  }

  return granted
}

export const getContacts = async () => {
  const hasContactsPermissions = await requestContactsPermissions()

  if (hasContactsPermissions) {
    const { data } = await Contacts.getContactsAsync({
      sort: Contacts.SortTypes.FirstName,
    })

    if (data.length > 0) {
      return data
    }
  } else {
    Alert.alert(
      'Error',
      "Contacts permissions not granted. Please allow access to contacts from your device's settings to start adding contacts into Pals.",
      [{ text: 'OK' }],
      { cancelable: true },
    )
  }

  return []
}
