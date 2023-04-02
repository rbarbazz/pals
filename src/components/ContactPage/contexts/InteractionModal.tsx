import PropTypes from 'prop-types'
import { createContext, useCallback, useMemo, useState, ReactNode } from 'react'

import useContextHook from '../../../contexts/useContextHook'
import { Interaction, PalsContact } from '../../../types/PalsContact'

type InteractionModalModalOptions = {
  contact: PalsContact
  interaction?: Interaction
} | null

export type InteractionModalContextValue = {
  openModal: (
    modalOptions: Omit<InteractionModalModalOptions, 'contact'>,
  ) => void
  closeModal: () => void
  modalOptions: InteractionModalModalOptions
}

const Context = createContext<InteractionModalContextValue | null>(null)
Context.displayName = 'InteractionModal'

export const Provider = ({
  children,
  contact,
}: {
  children: ReactNode
  contact: PalsContact
}) => {
  const [modalOptions, setModalOptions] =
    useState<InteractionModalModalOptions>(null)
  const openModal = useCallback(
    (nextModalOptions: Omit<InteractionModalModalOptions, 'contact'>) =>
      setModalOptions(
        nextModalOptions ? { ...nextModalOptions, contact } : nextModalOptions,
      ),
    [contact],
  )
  const closeModal = useCallback(() => setModalOptions(null), [])

  const value = useMemo(
    () => ({ openModal, closeModal, modalOptions }),
    [openModal, closeModal, modalOptions],
  )

  return <Context.Provider value={value}>{children}</Context.Provider>
}

Provider.propTypes = { children: PropTypes.node.isRequired }

export const useInteractionModal = () => useContextHook(Context)
