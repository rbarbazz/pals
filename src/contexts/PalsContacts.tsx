import { Contact } from 'expo-contacts'
import { createContext, ReactNode, useMemo, useState } from 'react'

import useContextHook from './useContextHook'

type ContextValue = [Contact[], React.Dispatch<React.SetStateAction<Contact[]>>]

const Context = createContext<ContextValue | null>(null)
Context.displayName = 'PalsContacts'

export const Provider = ({ children }: { children: ReactNode }) => {
  const [palsContacts, setPalsContacts] = useState<Contact[]>([])

  const value = useMemo(() => [palsContacts, setPalsContacts], [palsContacts])

  return (
    <Context.Provider value={value as ContextValue}>
      {children}
    </Context.Provider>
  )
}

export const usePalsContacts = () => useContextHook(Context)
