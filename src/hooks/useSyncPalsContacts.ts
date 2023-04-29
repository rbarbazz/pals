import { useCallback, useEffect } from 'react'
import { Alert, AppState } from 'react-native'

import { DEFAULT_ALERT_BUTTON_TEXT } from '../constants'
import { getDeviceContacts, setPalsContactsToStorage } from '../contactsHelpers'
import { usePalsContacts } from '../contexts/PalsContacts'

const useSyncPalsContacts = () => {
  const [palsContacts, setPalsContacts] = usePalsContacts()

  const syncPalsContactsData = useCallback(async () => {
    try {
      const deviceContacts = await getDeviceContacts({
        permissionRequestReason: 'to sync your contacts with Pals.',
      })

      setPalsContacts((prevPalsContacts) => {
        let hasUpdated = false
        const nextPalsContacts = prevPalsContacts.map((prevPalsContact) => {
          const matchingDeviceContact = deviceContacts.find(
            (deviceContact) => deviceContact.id === prevPalsContact.id,
          )

          if (
            !matchingDeviceContact ||
            (matchingDeviceContact.name === prevPalsContact.name &&
              matchingDeviceContact.image === prevPalsContact.image)
          )
            return prevPalsContact

          hasUpdated = true

          // This should mirror properties used in `addPalsContactToStorage`
          return {
            ...prevPalsContact,
            name: matchingDeviceContact.name,
            image: matchingDeviceContact.image,
          }
        })

        if (hasUpdated) {
          // Update stored contacts in the background
          setPalsContactsToStorage(nextPalsContacts)

          return nextPalsContacts
        }

        return prevPalsContacts
      })
    } catch {
      Alert.alert(
        'Error',
        'Error syncing your Pals contact with your device contacts.',
        [{ text: DEFAULT_ALERT_BUTTON_TEXT }],
        { cancelable: true },
      )
    }
  }, [setPalsContacts])

  // Sync Pals contacts with device contacts
  useEffect(() => {
    if (palsContacts.length) {
      const subscription = AppState.addEventListener(
        'change',
        (nextAppState) => {
          if (nextAppState === 'active') syncPalsContactsData()
        },
      )

      syncPalsContactsData()

      return subscription.remove
    }
  }, [palsContacts.length, syncPalsContactsData])
}

export default useSyncPalsContacts
