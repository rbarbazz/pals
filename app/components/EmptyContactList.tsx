import { Layout, Text } from '@ui-kitten/components'
import { StyledComponent } from 'nativewind'

const EmptyContactList = () => {
  return (
    <StyledComponent component={Layout} className="m-12 space-y-6">
      <StyledComponent
        appearance="hint"
        className="text-center"
        component={Text}
      >
        You haven't imported any contacts yet.
      </StyledComponent>
    </StyledComponent>
  )
}

export default EmptyContactList
