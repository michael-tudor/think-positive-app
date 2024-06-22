/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import {
  createQuestionsTable,
  insertDefaultQuestions,
  createAnswersTable,
  dropTable
} from './src/database/schema';

// dropTable('Questions');
// dropTable('Answers');
createQuestionsTable();
insertDefaultQuestions();
createAnswersTable();

AppRegistry.registerComponent(appName, () => App);
