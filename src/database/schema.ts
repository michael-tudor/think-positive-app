import db from './db';

// Questions table
const createQuestionsTable = () => {
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
        console.log('Table Questions created successfully.');
      },
      error => {
        console.log('Error creating Questions table: ', error);
      }
    );
  });
};

const insertDefaultQuestions = () => {
  db.transaction((tx) => {
    // Check if there is data in the Questions table
    tx.executeSql(
      `SELECT COUNT(ID) as count FROM Questions;`,
      [],
      (_, { rows }) => {
        if (rows.item(0).count === 0) {
          // If there is no data, add initial data
          tx.executeSql(
            `INSERT INTO Questions (Question, Purpose, Advice) VALUES
              (?, ?, ?),
              (?, ?, ?),
              (?, ?, ?),
              (?, ?, ?),
              (?, ?, ?),
              (?, ?, ?);`,
            [
              "What generates enthusiasm in my life and how does it make me feel?", "This question helps me identify the activities and passions that energize and inspire me. Understanding what excites me allows me to focus more on these aspects, boosting my motivation and overall happiness.", "Give 2 different answers.",
              "What achievements have I accomplished that I never thought possible?", "This question reminds me of my capabilities and resilience. Reflecting on these achievements boosts my confidence and encourages me to set and pursue even more ambitious goals.", "",
              "What is a recent success I've had?", "This question helps me recognize and celebrate my progress, no matter how small. Acknowledging recent successes boosts my motivation and reinforces a positive mindset.", "No matter how small.",
              "What will I do when my most important goal becomes a reality?", "", "The goal can be anything, but the bigger the better. Briefly describe the purpose and answer the question.",
              "I've already achieved my goal. What does that teach me?", "", "",
              "What in my life makes me grateful and how does that feel?", "", ""
            ],
            (_, _results) => {
              console.log('Default questions inserted successfully.');
            },
            error => {
              console.log('Error inserting question: ', error);
            }
          );
        }
      },
    );
  });
};

// Answers table
const createAnswersTable = () => {
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
        console.log('Table Answers created successfully.');
      },
      error => {
        console.log('Error creating Answers table: ', error);
      }
    );
  });
};

// Basic functionality
// TODO: Check updating record is working.
// Example: updateRecord('Questions', { Question: 'New question text' }, 1);
const updateRecord = (tableName, newData, id) => {
  // Create a query string with placeholders for each field in newData
  const fieldsToUpdate = Object.keys(newData).map(field => `${field} = ?`).join(', ');

  db.transaction((tx) => {
    tx.executeSql(
      `UPDATE ${tableName} SET ${fieldsToUpdate},
       UpdatedAt = CURRENT_TIMESTAMP WHERE ID = ?`,
      [...Object.values(newData), id],
      (_, { rowsAffected }) => {
        if (rowsAffected > 0) {
          console.log('Record updated successfully.');
        } else {
          console.log('Error updating record.');
        }
      },
      (_, error) => {
        console.log('Error updating record: ', error);
      },
    );
  });
};

const dropTable = (name) => {
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
  insertDefaultQuestions,
  createAnswersTable,
  updateRecord,
  dropTable
};
