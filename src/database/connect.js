import SQLite from 'react-native-sqlite-storage';

var db = SQLite.openDatabase(
  {
    name: 'MainDB',
    location: 'default',
  },
  () => {
    console.log('Database opened');
  },
  error => {
    console.log(error);
  },
);

export default db;
