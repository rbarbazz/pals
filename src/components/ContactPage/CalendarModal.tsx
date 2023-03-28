import {
  Button,
  Calendar,
  Card,
  Layout,
  Modal,
  Text,
  useStyleSheet,
} from '@ui-kitten/components'
import { addYears, subYears } from 'date-fns'
import { StyledComponent } from 'nativewind'
import { useState } from 'react'
import { StyleSheet } from 'react-native'

import NewInteractionButton from './NewInteractionButton'
import { usePalsContacts } from '../../contexts/PalsContacts'
import { updatePalsContactInStorage } from '../../helpers'
import { PalsContact } from '../../types/PalsContact'

const themedStyles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
})

const CalendarModal = ({ contact }: { contact: PalsContact }) => {
  const [, setPalsContacts] = usePalsContacts()
  const styles = useStyleSheet(themedStyles)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const today = new Date()
  const [selectedDate, setSelectedDate] = useState(today)
  const dateTenYearsAgo = subYears(today, 10)
  const dateTenYearsFromNow = addYears(today, 10)

  return (
    <>
      <Modal
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setIsCalendarOpen(false)}
        visible={isCalendarOpen}
      >
        <StyledComponent
          className="rounded-md"
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
                  })

                  setPalsContacts(nextPalsContacts)
                  setIsCalendarOpen(false)
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
        </StyledComponent>
      </Modal>
      <NewInteractionButton onPress={() => setIsCalendarOpen(true)} />
    </>
  )
}

export default CalendarModal
