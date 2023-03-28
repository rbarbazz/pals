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

const themedStyles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
})

const CalendarModal = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const styles = useStyleSheet(themedStyles)
  const today = new Date()
  const [date, setDate] = useState(today)
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
              <Button onPress={() => setIsCalendarOpen(false)}>Add</Button>
            </StyledComponent>
          )}
        >
          <Calendar
            date={date}
            max={dateTenYearsFromNow}
            min={dateTenYearsAgo}
            onSelect={(nextDate) => setDate(nextDate)}
          />
        </StyledComponent>
      </Modal>
      <NewInteractionButton onPress={() => setIsCalendarOpen(true)} />
    </>
  )
}

export default CalendarModal
