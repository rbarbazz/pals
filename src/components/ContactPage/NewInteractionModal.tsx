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
import { StyledComponent } from 'nativewind'
import { useState } from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'

import NewInteractionButton from './NewInteractionButton'
import { usePalsContacts } from '../../contexts/PalsContacts'
import { updatePalsContactInStorage } from '../../helpers'
import { PalsContact } from '../../types/PalsContact'

const themedStyles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
})

const interactionTypes = ['Call', 'In-person']

const NewInteractionModal = ({ contact }: { contact: PalsContact }) => {
  const [, setPalsContacts] = usePalsContacts()
  const styles = useStyleSheet(themedStyles)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  // Calendar state
  const today = new Date()
  const [selectedDate, setSelectedDate] = useState(today)
  const dateTenYearsAgo = subYears(today, 10)
  const dateTenYearsFromNow = addYears(today, 10)

  // Select state
  const [selectedIndex, setSelectedIndex] = useState<IndexPath>(
    new IndexPath(0),
  )

  // Note state
  const [inputValue, setInputValue] = useState('')

  return (
    <>
      <Modal
        style={{ overflow: 'scroll' }}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setIsCalendarOpen(false)}
        visible={isCalendarOpen}
      >
        <KeyboardAvoidingView behavior="position">
          <StyledComponent
            className="rounded-md space-y-4"
            component={Card}
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
                  onPress={async () => {
                    const nextPalsContacts = await updatePalsContactInStorage({
                      ...contact,
                      lastInteractionTimestamp: selectedDate.getTime(),
                      lastInteractionType: interactionTypes[
                        selectedIndex.row
                      ].toLowerCase() as 'call' | 'in-person',
                      lastInteractionNote: inputValue,
                    })

                    setPalsContacts(nextPalsContacts)
                    setIsCalendarOpen(false)

                    // Reset modal
                    setSelectedDate(today)
                    setSelectedIndex(new IndexPath(0))
                    setInputValue('')
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
              label="Note"
              multiline
              textStyle={{ minHeight: 64 }}
              onChangeText={setInputValue}
              size="small"
              value={inputValue}
            />
          </StyledComponent>
        </KeyboardAvoidingView>
      </Modal>
      <NewInteractionButton onPress={() => setIsCalendarOpen(true)} />
    </>
  )
}

export default NewInteractionModal
