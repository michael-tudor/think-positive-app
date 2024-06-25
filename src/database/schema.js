import db from './connect';

var createQuestionsTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Questions (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        Question TEXT NOT NULL,
        Purpose TEXT,
        Advice TEXT,
        CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      );`,
      [],
      () => {
        // console.log('Table Questions created successfully.');
      },
      error => {
        console.log('Error creating Questions table: ', error);
      }
    );
  });
};

var createAnswersTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Answers (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        QuestionID INTEGER NOT NULL,
        Answer TEXT NOT NULL,
        CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      );`,
      [],
      () => {
        // console.log('Table Answers created successfully.');
      },
      error => {
        console.log('Error creating Answers table: ', error);
      }
    );
  });
};

// Basic functionality
var dropTable = (name) => {
  db.transaction((tx) => {
    tx.executeSql(
      `DROP TABLE IF EXISTS ${name};`,
      [],
      () => {
        console.log('Table ' + name + ' dropped successfully.');
      },
      error => {
        console.log('Error dropping ' + name + ' table: ', error);
      }
    );
  });
};

export {
  createQuestionsTable,
  createAnswersTable,
  dropTable
};
