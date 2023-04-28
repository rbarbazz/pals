import {
  Icon,
  MenuItem,
  MenuItemProps,
  OverflowMenu,
  TopNavigationAction,
} from '@ui-kitten/components'
import { useCallback, useState } from 'react'
import { Platform, StatusBar } from 'react-native'

type TOverflowMenuWithActionsProps = {
  actions: {
    icon: MenuItemProps['accessoryLeft']
    name: string
    onPress: () => void
  }[]
}

const OverflowMenuWithActions = ({
  actions,
}: TOverflowMenuWithActionsProps) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false)

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

  return (
    <OverflowMenu
      anchor={renderMenuAction}
      onBackdropPress={toggleMenu}
      style={{
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
      visible={isMenuVisible}
    >
      {actions.map(({ icon, name, onPress }) => (
        <MenuItem accessoryLeft={icon} onPress={onPress} title={name} />
      ))}
    </OverflowMenu>
  )
}

export default OverflowMenuWithActions
