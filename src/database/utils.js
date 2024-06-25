import db from './connect';

// TODO: Check updating record is working.
// Example: updateRecord('Questions', { Question: 'New question text' }, 1);
// var updateRecord = (tableName, newData, id) => {
//   // Create a query string with placeholders for each field in newData
//   var fieldsToUpdate = Object.keys(newData).map(field => `${field} = ?`).join(', ');

//   db.transaction((tx) => {
//     tx.executeSql(
//       `UPDATE ${tableName} SET ${fieldsToUpdate},
//        UpdatedAt = CURRENT_TIMESTAMP WHERE ID = ?`,
//       [...Object.values(newData), id],
//       (_, { rowsAffected }) => {
//         if (rowsAffected > 0) {
//           console.log('Record updated successfully.');
//         } else {
//           console.log('Error updating record.');
//         }
//       },
//       (_, error) => {
//         console.log('Error updating record: ', error);
//       },
//     );
//   });
// };

/**
 * Deletes a record from the specified table by ID.
 * @param {string} tableName The name of the table from which the record will be deleted.
 * @param {number} id The ID of the record to delete.
 */
var deleteRecordById = (tableName, id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      var query = `DELETE FROM ${tableName} WHERE id = ?`;

      tx.executeSql(
        query,
        [id],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};

export { db, deleteRecordById };
