import {
  Button,
  Calendar,
  Card,
  IndexPath,
  Input,
  Layout,
  Modal,
  Select,
  SelectItem,
  Text,
  useStyleSheet,
} from '@ui-kitten/components'
import { addYears, subYears } from 'date-fns'
import * as Crypto from 'expo-crypto'
import { StyledComponent } from 'nativewind'
import { useCallback, useMemo, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet } from 'react-native'

import { updatePalsContactInStorage } from '../../../contactsHelpers'
import { usePalsContacts } from '../../../contexts/PalsContacts'
import { Interaction, PalsContact } from '../../../types/PalsContact'
import { InteractionModalContextValue } from '../contexts/InteractionModal'

const themedStyles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
})

const interactionTypes = ['In-person', 'Call']

const InteractionModal = ({
  closeModal,
  contact,
  interaction,
}: {
  closeModal: InteractionModalContextValue['closeModal']
  contact: PalsContact
  interaction?: Interaction
}) => {
  const { timestamp, type, notes, id } = interaction ?? {}
  const isEdit = !!interaction
  const [, setPalsContacts] = usePalsContacts()
  const styles = useStyleSheet(themedStyles)

  // Calendar state
  const today = useMemo(() => new Date(), [])
  const [selectedDate, setSelectedDate] = useState(
    timestamp ? new Date(timestamp) : today,
  )
  const dateTenYearsAgo = subYears(today, 10)
  const dateTenYearsFromNow = addYears(today, 10)

  // Select state
  const [selectedIndex, setSelectedIndex] = useState<IndexPath>(
    new IndexPath(type === 'in-person' ? 1 : 0),
  )

  // Notes state
  const [inputValue, setInputValue] = useState(notes ?? '')

  const resetModal = useCallback(() => {
    setSelectedDate(today)
    setSelectedIndex(new IndexPath(0))
    setInputValue('')
  }, [today])

  const updateInteractionsAndCloseModal = useCallback(
    async (nextInteractions: Interaction[]) => {
      const nextPalsContacts = await updatePalsContactInStorage({
        ...contact,
        interactions: nextInteractions,
      })

      setPalsContacts(nextPalsContacts)
      closeModal()
      resetModal()
    },
    [closeModal, contact, resetModal, setPalsContacts],
  )

  return (
    <Modal
      style={{ overflow: 'scroll' }}
      backdropStyle={styles.backdrop}
      onBackdropPress={closeModal}
      visible
    >
      <KeyboardAvoidingView behavior="position">
        <StyledComponent
          className="rounded-md space-y-4"
          component={Card}
          disabled
          header={() => (
            <StyledComponent
              className="p-4 text-center"
              component={Text}
              category="h5"
            >
              Select interaction date
            </StyledComponent>
          )}
          footer={() => (
            <StyledComponent
              component={Layout}
              className="flex space-x-4 flex-row justify-end p-4"
            >
              <Button
                appearance="outline"
                onPress={() => {
                  closeModal()
                  resetModal()
                }}
              >
                Cancel
              </Button>
              {isEdit && (
                <Button
                  status="danger"
                  onPress={async () => {
                    await updateInteractionsAndCloseModal(
                      contact.interactions.filter(
                        (prevInteraction) => prevInteraction.id !== id,
                      ),
                    )
                  }}
                >
                  Delete
                </Button>
              )}
              <Button
                onPress={async () => {
                  const interactionProps = {
                    timestamp: selectedDate.getTime(),
                    type: interactionTypes[selectedIndex.row].toLowerCase() as
                      | 'call'
                      | 'in-person',
                    notes: inputValue,
                  }
                  const nextInteractions = isEdit
                    ? contact.interactions.reduce(
                        (currentNextInteractions, prevInteraction) => [
                          ...currentNextInteractions,
                          prevInteraction.id === id
                            ? { ...prevInteraction, ...interactionProps }
                            : prevInteraction,
                        ],
                        [] as Interaction[],
                      )
                    : [
                        ...contact.interactions,
                        { id: Crypto.randomUUID(), ...interactionProps },
                      ]

                  await updateInteractionsAndCloseModal(nextInteractions)
                }}
              >
                {isEdit ? 'Edit' : 'Add'}
              </Button>
            </StyledComponent>
          )}
        >
          <Calendar
            date={selectedDate}
            max={dateTenYearsFromNow}
            min={dateTenYearsAgo}
            onSelect={(nextDate) => setSelectedDate(nextDate)}
          />
          <Select
            label="Last in touch"
            selectedIndex={selectedIndex}
            onSelect={(index) => setSelectedIndex(index as IndexPath)}
            value={interactionTypes[selectedIndex.row]}
          >
            <SelectItem title={interactionTypes[0]} />
            <SelectItem title={interactionTypes[1]} />
          </Select>
          <Input
            label="Notes"
            multiline
            textStyle={{ minHeight: 64 }}
            onChangeText={setInputValue}
            size="small"
            value={inputValue}
          />
        </StyledComponent>
      </KeyboardAvoidingView>
    </Modal>
  )
}

export default InteractionModal
