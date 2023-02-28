import { Button, Layout, Text } from '@ui-kitten/components'
import { StyledComponent } from 'nativewind'

type Props = {
  bodyText?: string
  buttonText?: string
  onPress?: () => void
}

const EmptyView = ({ bodyText = '', buttonText = '', onPress }: Props) => (
  <StyledComponent component={Layout} className="m-auto p-12 space-y-6">
    {bodyText && (
      <StyledComponent
        appearance="hint"
        className="text-center"
        component={Text}
      >
        {bodyText}
      </StyledComponent>
    )}
    {onPress && <Button onPress={onPress}>{buttonText}</Button>}
  </StyledComponent>
)

export default EmptyView
