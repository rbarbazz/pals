import { Contact } from 'expo-contacts'
import { createContext, ReactNode, useState } from 'react'

import useContextHook from './useContextHook'

const Context = createContext<
  [Contact[], React.Dispatch<React.SetStateAction<Contact[]>>] | null
>(null)
Context.displayName = 'PalsContacts'

export const Provider = ({ children }: { children: ReactNode }) => {
  const [palsContacts, setPalsContacts] = useState<Contact[]>([])

  return (
    <Context.Provider value={[palsContacts, setPalsContacts]}>
      {children}
    </Context.Provider>
  )
}

export const usePalsContacts = () => useContextHook(Context)
