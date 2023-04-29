import { Divider, Icon, Layout, TopNavigation } from '@ui-kitten/components'
import { StyledComponent } from 'nativewind'

import ContactImportButton from '../src/components/ContactImport/ContactImportButton'
import ContactList from '../src/components/ContactList'
import EmptyView from '../src/components/EmptyView'
import OverflowMenuWithActions from '../src/components/OverflowMenuWithActions'
import SafeAreaView from '../src/components/SafeAreaView'
import { usePalsContacts } from '../src/contexts/PalsContacts'
import { exportPalsDataToFs, importPalsDataToApp } from '../src/fsHelpers'
import useLoadPalsContacts from '../src/hooks/useLoadPalsContacts'
import useSyncPalsContacts from '../src/hooks/useSyncPalsContacts'

const MainScreen = () => {
  const [palsContacts, setPalsContacts] = usePalsContacts()
  useLoadPalsContacts()
  useSyncPalsContacts()

  return (
    <SafeAreaView>
      <StyledComponent component={Layout} className="flex-1">
        <TopNavigation
          alignment="center"
          title="Your Relationships"
          accessoryRight={() => (
            <OverflowMenuWithActions
              actions={[
                {
                  icon: (props) => <Icon {...props} name="upload" />,
                  onPress: exportPalsDataToFs,
                  name: 'Export data',
                },
                {
                  icon: (props) => <Icon {...props} name="download" />,
                  onPress: async () =>
                    await importPalsDataToApp(setPalsContacts),
                  name: 'Import data',
                },
              ]}
            />
          )}
        />
        <Divider />
        {palsContacts.length ? (
          <ContactList />
        ) : (
          <EmptyView bodyText="You haven't added any contacts yet." />
        )}
        <ContactImportButton />
      </StyledComponent>
    </SafeAreaView>
  )
}

export default MainScreen
