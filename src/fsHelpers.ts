import * as DocumentPicker from 'expo-document-picker'
import * as FileSystem from 'expo-file-system'
import { Alert } from 'react-native'

import {
  getPalsContactsFromStorage,
  setPalsContactsToStorage,
} from './contactsHelpers'
import { PalsContact } from './types/PalsContact'
import { validatePalsContacts } from './utils'

export const exportPalsDataToFs = async () => {
  // TODO: iOS support
  try {
    const permissions =
      await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync()

    if (permissions.granted) {
      const uri = permissions.directoryUri
      const fileName = `palsDataExport-${new Date().toISOString()}.json`
      const fileUri = await FileSystem.StorageAccessFramework.createFileAsync(
        uri,
        fileName,
        'application/json',
      )

      await FileSystem.StorageAccessFramework.writeAsStringAsync(
        fileUri,
        JSON.stringify(await getPalsContactsFromStorage()),
      )

      Alert.alert(
        'Success',
        'Your data was successfully exported.',
        [{ text: 'OK' }],
        { cancelable: true },
      )
    }
  } catch {
    Alert.alert(
      'Error',
      'An error occurred while exporting your data.',
      [{ text: 'OK' }],
      { cancelable: true },
    )
  }
}

export const importPalsDataToApp = async (
  setPalsContacts: (palsContact: PalsContact[]) => void,
) => {
  try {
    const file = await DocumentPicker.getDocumentAsync({
      type: 'application/json',
      copyToCacheDirectory: false,
    })

    if (file.type === 'success') {
      const fileContent =
        await FileSystem.StorageAccessFramework.readAsStringAsync(file.uri)
      const parsedFileContent = JSON.parse(fileContent)

      // This will throw if the content is invalid
      validatePalsContacts(parsedFileContent)

      Alert.alert(
        'Import',
        `${
          (parsedFileContent as PalsContact[]).length
        } contacts found. Importing will override all existing data. Do you want to proceed?`,
        [
          { text: 'No' },
          {
            text: 'Yes',
            onPress: async () => {
              await setPalsContactsToStorage(parsedFileContent as PalsContact[])
              setPalsContacts(parsedFileContent as PalsContact[])
            },
          },
        ],
        { cancelable: true },
      )
    }
  } catch {
    Alert.alert(
      'Error',
      'An error occurred while importing your data.',
      [{ text: 'OK' }],
      { cancelable: true },
    )
  }
}
