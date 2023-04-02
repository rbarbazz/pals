import { Layout, Text } from '@ui-kitten/components'
import { StyledComponent } from 'nativewind'

const ContactPageEmptyView = () => (
  <StyledComponent component={Layout} className="flex-1 items-center space-y-4">
    <StyledComponent
      appearance="hint"
      component={Text}
      className="text-center max-w-xs"
    >
      You haven't recorded any interaction with this contact yet.
    </StyledComponent>
    <StyledComponent
      appearance="hint"
      component={Text}
      className="text-center max-w-xs"
    >
      Press the button to add your first entry.
    </StyledComponent>
  </StyledComponent>
)

export default ContactPageEmptyView
