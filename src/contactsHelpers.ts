import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Contacts from 'expo-contacts'
import * as Crypto from 'expo-crypto'
import { Alert } from 'react-native'

import { DEFAULT_ALERT_BUTTON_TEXT, PALS_CONTACTS_KEY } from './constants'
import { PalsContact, PalsContactListName } from './types/PalsContact'

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
      [{ text: DEFAULT_ALERT_BUTTON_TEXT }],
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

export const addPalsContactToStorage = async (
  contact: Contacts.Contact,
  selectedListName: PalsContactListName,
) => {
  // This is where we pick the fields we want to store
  const { name, image } = contact
  const newPalsContact: PalsContact = {
    id: Crypto.randomUUID(),
    name,
    image,
    interactions: [],
    listName: selectedListName,
  }

  const prevPalsContacts: PalsContact[] = await getPalsContactsFromStorage()
  const nextPalsContacts = [...prevPalsContacts, newPalsContact]

  await setPalsContactsToStorage(nextPalsContacts)

  return nextPalsContacts
}

export const removePalsContactToStorage = async (
  contactId: PalsContact['id'],
) => {
  const prevPalsContacts: PalsContact[] = await getPalsContactsFromStorage()
  const nextPalsContacts = prevPalsContacts.filter(
    (prevPalsContact) => prevPalsContact.id !== contactId,
  )

  await setPalsContactsToStorage(nextPalsContacts)

  return nextPalsContacts
}

export const updatePalsContactInStorage = async (contact: PalsContact) => {
  const prevPalsContacts: PalsContact[] = await getPalsContactsFromStorage()
  contact.interactions.sort((a, b) => b.timestamp - a.timestamp)
  const nextPalsContacts = [
    ...prevPalsContacts.filter(
      (prevPalsContact) => prevPalsContact.id !== contact.id,
    ),
    contact,
  ]

  await setPalsContactsToStorage(nextPalsContacts)

  return nextPalsContacts
}
