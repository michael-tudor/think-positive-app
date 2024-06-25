/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import {
  createQuestionsTable,
  createAnswersTable,
  dropTable
} from './src/database/schema';
import { addQuestions } from './src/database/seeds';

// Drop the tables if they exist
// dropTable('Questions');
// dropTable('Answers');

// Create the tables if not exist
createQuestionsTable();
createAnswersTable();

// Seed the database with initial data if not exist
addQuestions();

AppRegistry.registerComponent(appName, () => App);
