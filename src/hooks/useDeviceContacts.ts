import { Contact } from 'expo-contacts'
import { useState, useEffect } from 'react'

import { getContacts } from '../components/ContactImport/helpers'

const useDeviceContacts = (permissionRequestReason: string) => {
  const [deviceContacts, setDeviceContacts] = useState<Contact[] | null>(null)

  useEffect(() => {
    const initialGetContacts = async () => {
      const _contacts = await getContacts({ permissionRequestReason })

      setDeviceContacts(_contacts)
    }

    initialGetContacts()
  }, [permissionRequestReason])

  return deviceContacts
}

export default useDeviceContacts
