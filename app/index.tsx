import { Layout } from '@ui-kitten/components'
import { StyledComponent } from 'nativewind'

import ContactImport from './components/ContactImport'
import EmptyContactList from './components/EmptyContactList'

export default function MainScreen() {
  return (
    <StyledComponent
      component={Layout}
      className="flex flex-1 justify-center items-center flex-col relative"
    >
      <EmptyContactList />
      <ContactImport />
    </StyledComponent>
  )
}
