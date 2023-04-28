import { Contact } from 'expo-contacts'
import { useState, useEffect } from 'react'

import { getDeviceContacts } from '../contactsHelpers'

const useDeviceContacts = (permissionRequestReason: string) => {
  const [deviceContacts, setDeviceContacts] = useState<Contact[] | null>(null)

  useEffect(() => {
    const initialGetContacts = async () => {
      const _contacts = await getDeviceContacts({ permissionRequestReason })

      setDeviceContacts(_contacts)
    }

    initialGetContacts()
  }, [permissionRequestReason])

  return deviceContacts
}

export default useDeviceContacts
