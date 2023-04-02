import {
  Icon,
  MenuItem,
  OverflowMenu,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components'
import { useRouter } from 'expo-router'
import { useCallback, useState } from 'react'
import { Platform, StatusBar } from 'react-native'

import { usePalsContacts } from '../../../contexts/PalsContacts'
import { removePalsContactToStorage } from '../../../helpers'
import { PalsContact } from '../../../types/PalsContact'

type TContactPageTopNavigationProps = {
  contactId: PalsContact['id']
}

const ContactPageTopNavigation = ({
  contactId,
}: TContactPageTopNavigationProps) => {
  const router = useRouter()
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const [, setPalsContacts] = usePalsContacts()

  const toggleMenu = useCallback(() => {
    setIsMenuVisible((prev) => !prev)
  }, [])

  const renderMenuAction = useCallback(
    () => (
      <TopNavigationAction
        icon={(props) => <Icon {...props} name="more-vertical" />}
        onPress={toggleMenu}
      />
    ),
    [toggleMenu],
  )

  const renderRightActions = () => (
    <OverflowMenu
      anchor={renderMenuAction}
      onBackdropPress={toggleMenu}
      style={{
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
      visible={isMenuVisible}
    >
      <MenuItem
        accessoryLeft={(props) => <Icon {...props} name="trash" />}
        onPress={async () => {
          const nextPalsContacts = await removePalsContactToStorage(contactId)

          router.back()
          setPalsContacts(nextPalsContacts)
        }}
        title="Remove"
      />
    </OverflowMenu>
  )

  return (
    <TopNavigation
      accessoryLeft={
        <TopNavigationAction
          icon={(props) => <Icon {...props} name="arrow-back" />}
          onPress={() => router.back()}
        />
      }
      accessoryRight={renderRightActions}
      alignment="center"
    />
  )
}

export default ContactPageTopNavigation
