import { createContext, ReactNode, useMemo, useState } from 'react'

import useContextHook from './useContextHook'

export const palsContactsLists = ['Family', 'Friends'] as const
type ContextValue = [number, React.Dispatch<React.SetStateAction<number>>]

const Context = createContext<ContextValue | null>(null)
Context.displayName = 'PalsContactsList'

export const Provider = ({ children }: { children: ReactNode }) => {
  const [selectedPalsContactListIndex, setSelectedPalsContactListIndex] =
    useState(0)

  const value = useMemo(
    () => [selectedPalsContactListIndex, setSelectedPalsContactListIndex],
    [selectedPalsContactListIndex],
  )

  return (
    <Context.Provider value={value as ContextValue}>
      {children}
    </Context.Provider>
  )
}

export const usePalsContactsList = () => useContextHook(Context)
