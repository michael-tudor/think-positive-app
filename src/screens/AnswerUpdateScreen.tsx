import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TextInput, Button, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import db from '../database/db';
// Styles and Design
import { styles } from '../styles/styles';

var AnswerUpdateScreen = () => {
  var navigation = useNavigation();
  var route = useRoute();
  var { answerId } = route.params;
  var [question, setQuestion] = useState('');
  var [purpose, setPurpose] = useState('');
  var [advice, setAdvice] = useState('');
  var [answer, setAnswer] = useState('');
  var [error, setError] = useState('');

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT Answers.*, Questions.Question, Questions.Purpose, Questions.Advice
          FROM Answers JOIN Questions
          ON Answers.QuestionID = Questions.ID
          WHERE Answers.ID = ?`,
        [answerId],
        (_, { rows }) => {
          if (rows.length > 0) {
            var record = rows.item(0);

            setAnswer(record.Answer);
            setQuestion(record.Question);
            setPurpose(record.Purpose);
            setAdvice(record.Advice);
          }
        },
        (_, error) => {
          console.log('Error fetching answer and question: ', error);
        },
      );
    });
  }, [answerId]);

  var handleSubmit = () => {
    if (!answer.trim()) {
      setError('Answer field is required.');
      return;
    }

    setError('');
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE Answers SET Answer = ? WHERE ID = ?',
        [answer, answerId],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Answer added successfully.',
              [{ text: 'OK', onPress: () => navigation.goBack() }]
            );
          } else {
            console.log('Answer could not be added.');
          }
        },
        (_, error) => {
          console.log('Error updating answer: ', error);
        },
      );
    });
  };

  return (
    <ScrollView>
      <View>
        <Text style={styles.mainHeader}>{question}</Text>
        { purpose ? <Text style={styles.mainSubHeader}>{purpose}</Text> : null }

        <View style={styles.questionFormContainer}>
          <TextInput
            style={[styles.formTextArea, styles.p]}
            multiline={true}
            value={answer}
            onChangeText={setAnswer}
            placeholder="Your answer here..."
          />
          <Text style={styles.textInfo}>{advice}</Text>
          {error ? <Text style={{color: 'red'}}>{error}</Text> : null}
          <View style={styles.mt}>
            <Button title="Update Answer" onPress={handleSubmit} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AnswerUpdateScreen;
