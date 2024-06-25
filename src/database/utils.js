import db from './connect';

/**
 * Finds a record by ID from the specified table.
 * @param {string} tableName The name of the table to query.
 * @param {number} id The ID of the record to find.
 * @returns {Promise<Object|null>} A promise that resolves with the found record or null if not found.
*/
var findRecordById = (tableName, recordId) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM ${tableName} WHERE ID = ?`,
        [recordId],
        (_, { rows }) => {
          if (rows.length > 0) {
            resolve(rows.item(0));
          } else {
            resolve(null);
          }
        },
        (_, error) => reject(error)
      );
    });
  });
}

/**
 * Updates a record in the specified table with the provided data.
 * @param {string} tableName The name of the table to update.
 * @param {Object} data An object containing the fields to update and their new values.
 * @param {number} recordId The ID of the record to update.
 * @returns {Promise<number>} A promise that resolves with the number of rows affected.
*/
var updateRecord = (tableName, data, recordId) => {
  return new Promise((resolve, reject) => {
    // Create a query string with placeholders for each field in data
    var fieldsToUpdate = Object.keys(data).map(field => `${field} = ?`).join(', ');

    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE ${tableName} SET ${fieldsToUpdate},
        UpdatedAt = CURRENT_TIMESTAMP WHERE ID = ?`,
        [...Object.values(data), recordId],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            resolve(rowsAffected);
          } else {
            reject(`Error updating record in ${tableName}.`)
          }
        },
        (_, error) => reject(error)
      );
    });
  });
};

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

/**
 * Checks if a given record has dependencies in other tables.
 * This function is designed to prevent deletion of records that are
 * being referenced by other tables, ensuring referential integrity
 * in the database.
 * 
 * @param {string} tableName The name of the table from which the record might be deleted.
 * @param {number} recordId The ID of the record to check for dependencies.
 * @returns {Promise<boolean>} A promise that resolves with `true` if dependencies are found.
*/
var checkDependenciesById = (tableName, recordId) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      var tablesQuery = `
        SELECT name
        FROM sqlite_master
        WHERE type='table'
        AND name NOT LIKE 'sqlite_%';
      `;

      tx.executeSql(tablesQuery, [], (_, results) => {
        var tables = [];
        for (let i = 0; i < results.rows.length; i++) {
          tables.push(results.rows.item(i));
        }

        for (var table of tables) {
          var columnsQuery = `PRAGMA table_info(${table.name});`;
          tx.executeSql(columnsQuery, [], (_, results) => {
            var columns = [];
            for (let i = 0; i < results.rows.length; i++) {
              columns.push(results.rows.item(i));
            }

            for (var column of columns) {
              if (column.name != 'ID' && column.name.endsWith('ID')) {
                // Remove "ID" from the column name
                var parentTableName = column.name.slice(0, -2);

                // Checking for a match with the name of the table being searched for
                if (parentTableName.toLowerCase() + 's' === tableName.toLowerCase()) {
                  var dependencyQuery = `
                    SELECT count(*)
                    AS count
                    FROM ${table.name}
                    WHERE ${column.name} = ?;
                  `;

                  tx.executeSql(dependencyQuery, [recordId], (_, results) => {
                    if (results.rows.item(0).count > 0) {
                      resolve(true);
                    }
                  }, (error) => reject(error));
                }
              }
            }
          }, (error) => reject(error));
        }
      }, (error) => reject(error));
    });
  });
};

export {
  db,
  findRecordById,
  updateRecord,
  deleteRecordById,
  checkDependenciesById
};
