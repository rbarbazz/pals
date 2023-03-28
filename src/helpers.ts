import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Contacts from 'expo-contacts'
import { Alert } from 'react-native'

import { PALS_CONTACTS_KEY } from './constants'
import { PalsContact } from './types/PalsContact'

const requestContactsPermissions = async () => {
  const { canAskAgain, granted } = await Contacts.getPermissionsAsync()

  if (!granted && canAskAgain) {
    const { granted } = await Contacts.requestPermissionsAsync()

    return granted
  }

  return granted
}

export const getDeviceContacts = async ({
  permissionRequestReason,
}: {
  permissionRequestReason: string
}) => {
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
      `Contacts permissions not granted. Please allow access to contacts from your device's settings${
        permissionRequestReason ? ` ${permissionRequestReason}` : '.'
      }`,
      [{ text: 'OK' }],
      { cancelable: true },
    )
  }

  return []
}

export const setPalsContactsToStorage = async (palsContacts: PalsContact[]) =>
  AsyncStorage.setItem(PALS_CONTACTS_KEY, JSON.stringify(palsContacts))

export const getPalsContactsFromStorage = async (): Promise<PalsContact[]> => {
  const itemValue = await AsyncStorage.getItem(PALS_CONTACTS_KEY)

  return typeof itemValue === 'string' ? JSON.parse(itemValue) : []
}

export const addPalsContactToStorage = async (contact: Contacts.Contact) => {
  // This is where we pick the fields we want to store
  const { id, name, image } = contact
  const newPalsContact: PalsContact = {
    id,
    name,
    image,
    lastInteractionTimestamp: undefined,
    lastInteractionType: '',
  }
  try {
    const prevPalsContacts: PalsContact[] = await getPalsContactsFromStorage()
    const nextPalsContacts = [...prevPalsContacts, newPalsContact]

    await setPalsContactsToStorage(nextPalsContacts)

    return nextPalsContacts
  } catch {
    // TODO: handle errors
  }

  return []
}

export const removePalsContactToStorage = async (
  contactId: PalsContact['id'],
) => {
  try {
    const prevPalsContacts: PalsContact[] = await getPalsContactsFromStorage()
    const nextPalsContacts = prevPalsContacts.filter(
      (prevPalsContact) => prevPalsContact.id !== contactId,
    )

    await setPalsContactsToStorage(nextPalsContacts)

    return nextPalsContacts
  } catch {
    // TODO: handle errors
  }

  return []
}

export const updatePalsContactInStorage = async (contact: PalsContact) => {
  try {
    const prevPalsContacts: PalsContact[] = await getPalsContactsFromStorage()
    const nextPalsContacts = [
      ...prevPalsContacts.filter(
        (prevPalsContact) => prevPalsContact.id !== contact.id,
      ),
      contact,
    ]

    await setPalsContactsToStorage(nextPalsContacts)

    return nextPalsContacts
  } catch {
    // TODO: handle errors
  }

  return []
}