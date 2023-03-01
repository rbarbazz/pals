import {
  Button,
  Divider,
  Layout,
  List,
  Modal,
  TopNavigation,
  TopNavigationAction,
  useTheme,
} from '@ui-kitten/components'
import { Contact } from 'expo-contacts'
import { StyledComponent } from 'nativewind'
import { useCallback, useState } from 'react'

import { getContacts } from './helpers'
import ContactListItem from '../ContactListItem'
import EmptyView from '../EmptyView'
import BackIcon from '../Icons/BackIcon'
import PersonAddIcon from '../Icons/PersonAddIcon'
import SafeAreaView from '../SafeAreaView'

const renderItemRightAccessory = () => <Button size="small">Import</Button>
const renderItem = ({ item }: { item: Contact }) => (
  <ContactListItem
    item={item}
    renderItemRightAccessory={renderItemRightAccessory}
  />
)

const ContactImport = () => {
  const theme = useTheme()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [contacts, setContacts] = useState<Contact[]>([])
  const onPress = useCallback(async () => {
    const _contacts = await getContacts()
    setContacts(_contacts)
    setIsModalVisible(true)
  }, [])

  return (
    <>
      <StyledComponent className="absolute bottom-8 right-8" component={Layout}>
        <Button accessoryRight={PersonAddIcon} onPress={onPress}>
          Add
        </Button>
      </StyledComponent>
      <StyledComponent
        component={Modal}
        className="w-screen h-screen"
        visible={isModalVisible}
        backdropStyle={{ backgroundColor: theme['background-basic-color-1'] }}
      >
        <SafeAreaView>
          {contacts.length ? (
            <>
              <TopNavigation
                accessoryLeft={
                  <TopNavigationAction
                    icon={<BackIcon />}
                    onPress={() => setIsModalVisible(false)}
                  />
                }
              />
              <List
                data={contacts} // TODO: Exclude contacts that are already imported
                renderItem={renderItem}
                ItemSeparatorComponent={Divider}
              />
            </>
          ) : (
            <EmptyView
              bodyText="You have no contacts to import."
              buttonText="Close"
              onPress={() => setIsModalVisible(false)}
            />
          )}
        </SafeAreaView>
      </StyledComponent>
    </>
  )
}

export default ContactImport
