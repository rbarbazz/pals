import { formatDistance, isToday, startOfToday } from 'date-fns'
import { Contact } from 'expo-contacts'

import { PalsContact } from './types/PalsContact'

export const isPalsContact = (
  contact: Contact | PalsContact,
): contact is PalsContact => (contact as PalsContact).interactions !== undefined

export const timestampToRelativeTime = (timestamp: number) => {
  const date = new Date(timestamp)

  return isToday(date)
    ? 'today'
    : formatDistance(date, startOfToday(), {
        addSuffix: true,
      })
}
