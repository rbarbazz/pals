import { Layout } from '@ui-kitten/components'
import { StyledComponent } from 'nativewind'

import ContactImport from './components/ContactImport/ContactImport'
import EmptyView from './components/EmptyView'
import SafeAreaView from './components/SafeAreaView'

const MainScreen = () => (
  <SafeAreaView>
    <StyledComponent component={Layout} className="grow relative">
      <EmptyView bodyText="You haven't imported any contacts yet." />
      <ContactImport />
    </StyledComponent>
  </SafeAreaView>
)

export default MainScreen
