import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect } from 'react'
import { Alert } from 'react-native'

import { DEFAULT_ALERT_BUTTON_TEXT, PALS_CONTACTS_KEY } from '../constants'
import { usePalsContacts } from '../contexts/PalsContacts'

const getPalsContactsFromStorage = async () => {
  const itemValue = await AsyncStorage.getItem(PALS_CONTACTS_KEY)

  return typeof itemValue === 'string' ? JSON.parse(itemValue) : []
}

const useLoadPalsContacts = () => {
  const [, setPalsContacts] = usePalsContacts()

  // Load Pals contacts
  useEffect(() => {
    const setPalsContactsFromStorage = async () => {
      try {
        setPalsContacts(await getPalsContactsFromStorage())
      } catch {
        setPalsContacts([])
        Alert.alert(
          'Error',
          'Pals encountered an error, please restart the application.',
          [{ text: DEFAULT_ALERT_BUTTON_TEXT }],
          { cancelable: true },
        )
      }
    }

    setPalsContactsFromStorage()
  }, [setPalsContacts])
}

export default useLoadPalsContacts
