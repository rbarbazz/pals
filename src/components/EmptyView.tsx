import { Layout, Text } from '@ui-kitten/components'
import { StyledComponent } from 'nativewind'

type Props = {
  bodyText?: string
}

const EmptyView = ({ bodyText = '' }: Props) => (
  <StyledComponent
    component={Layout}
    className="flex-1 justify-center items-center"
  >
    {bodyText && (
      <StyledComponent
        appearance="hint"
        className="text-center"
        component={Text}
      >
        {bodyText}
      </StyledComponent>
    )}
  </StyledComponent>
)

export default EmptyView
