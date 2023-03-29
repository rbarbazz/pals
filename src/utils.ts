import { formatDistance, isToday, startOfToday } from 'date-fns'
import { Contact } from 'expo-contacts'

import { PalsContact } from './types/PalsContact'

export const isPalsContact = (
  contact: Contact | PalsContact,
): contact is PalsContact => (contact as PalsContact).interactions !== undefined

export const formatLastInteractionTimestamp = (
  lastInteractionTimestamp: number,
) => {
  const lastInteractionDate = new Date(lastInteractionTimestamp)

  return isToday(lastInteractionDate)
    ? 'today'
    : formatDistance(lastInteractionDate, startOfToday(), {
        addSuffix: true,
      })
}
