import { useCallback, useEffect } from 'react'
import { AppState } from 'react-native'

import { usePalsContacts } from '../contexts/PalsContacts'
import { getDeviceContacts, setPalsContactsToStorage } from '../helpers'

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
            matchingDeviceContact &&
            JSON.stringify(matchingDeviceContact) !==
              JSON.stringify(prevPalsContact)
          ) {
            hasUpdated = true

            return { ...prevPalsContact, ...matchingDeviceContact }
          }

          return prevPalsContact
        })

        if (hasUpdated) {
          // Update stored contacts in the background
          setPalsContactsToStorage(nextPalsContacts)

          return nextPalsContacts
        }

        return prevPalsContacts
      })
    } catch {}
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
