import { createContext, ReactNode, useMemo, useState } from 'react'

import useContextHook from './useContextHook'
import { PalsContact } from '../types/PalsContact'

type ContextValue = [
  PalsContact[],
  React.Dispatch<React.SetStateAction<PalsContact[]>>,
]

const Context = createContext<ContextValue | null>(null)
Context.displayName = 'PalsContacts'

export const Provider = ({ children }: { children: ReactNode }) => {
  const [palsContacts, setPalsContacts] = useState<PalsContact[]>([])

  const value = useMemo(() => [palsContacts, setPalsContacts], [palsContacts])

  return (
    <Context.Provider value={value as ContextValue}>
      {children}
    </Context.Provider>
  )
}

export const usePalsContacts = () => useContextHook(Context)
