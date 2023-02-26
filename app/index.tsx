import { Button, Layout } from '@ui-kitten/components'
import * as Contacts from 'expo-contacts'
import { StyledComponent } from 'nativewind'
import { useCallback } from 'react'

import EmptyContactList from './components/EmptyContactList'
import PersonAddIcon from './components/Icons/PersonAddIcon'

export default function MainScreen() {
  const getContacts = useCallback(async () => {
    const { status } = await Contacts.requestPermissionsAsync()

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        sort: Contacts.SortTypes.FirstName,
      })

      if (data.length > 0) {
        const contact = data[0]
        console.log(contact)
      }
    } else {
      // TODO: show an error message directing the user to their settings
    }
  }, [])

  return (
    <StyledComponent
      component={Layout}
      className="flex flex-1 justify-center items-center flex-col relative"
    >
      <EmptyContactList />
      <StyledComponent className="absolute bottom-8 right-8" component={Layout}>
        <StyledComponent
          accessoryRight={PersonAddIcon}
          component={Button}
          onPress={getContacts}
        >
          Add
        </StyledComponent>
      </StyledComponent>
    </StyledComponent>
  )
}
