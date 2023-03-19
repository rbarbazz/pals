import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect } from 'react'

import { PALS_CONTACTS_KEY } from '../constants'
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
        // TODO: show an error message
        setPalsContacts([])
      }
    }

    setPalsContactsFromStorage()
  }, [setPalsContacts])
}

export default useLoadPalsContacts
