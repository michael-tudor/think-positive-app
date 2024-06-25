import db from './connect';

var addQuestions = () => {
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

export { addQuestions };
