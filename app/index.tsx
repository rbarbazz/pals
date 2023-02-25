import { Layout, Text } from '@ui-kitten/components'

export default function MainScreen() {
  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text category="h1">Main Screen</Text>
      <Text>
        Change any of the text, save the file, and your app will automatically
        update.
      </Text>
    </Layout>
  )
}
