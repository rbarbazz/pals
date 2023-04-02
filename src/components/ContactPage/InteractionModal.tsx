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

import { InteractionModalContextValue } from './contexts/InteractionModal'
import { usePalsContacts } from '../../contexts/PalsContacts'
import { updatePalsContactInStorage } from '../../helpers'
import { Interaction, PalsContact } from '../../types/PalsContact'

const themedStyles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
})

const interactionTypes = ['Call', 'In-person']

const InteractionModal = ({
  closeModal,
  contact,
  interaction,
}: {
  closeModal: InteractionModalContextValue['closeModal']
  contact: PalsContact
  interaction?: Interaction
}) => {
  const { timestamp, type, notes } = interaction ?? {}
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
              <Button
                onPress={async () => {
                  const nextPalsContacts = await updatePalsContactInStorage({
                    ...contact,
                    interactions: [
                      ...contact.interactions,
                      {
                        id: Crypto.randomUUID(),
                        timestamp: selectedDate.getTime(),
                        type: interactionTypes[
                          selectedIndex.row
                        ].toLowerCase() as 'call' | 'in-person',
                        notes: inputValue,
                      },
                    ],
                  })

                  setPalsContacts(nextPalsContacts)
                  closeModal()
                  resetModal()
                }}
              >
                Add
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
