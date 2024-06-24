import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, Button, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import db from '../database/db';
import { styles } from '../styles/styles';

var AnswerCreateScreen = () => {
  var navigation = useNavigation();
  var route = useRoute();
  var { questionId } = route.params;
  var [question, setQuestion] = useState('');
  var [purpose, setPurpose] = useState('');
  var [advice, setAdvice] = useState('');
  var [answer, setAnswer] = useState('');
  var [error, setError] = useState('');

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM Questions WHERE id = ?',
        [questionId],
        (_, { rows }) => {
          if (rows.length > 0) {
            setQuestion(rows.item(0).Question);
            setPurpose(rows.item(0).Purpose);
            setAdvice(rows.item(0).Advice);
          }
        },
        (_, error) => {
          console.log('Error fetching question: ', error);
        },
      );
    });
  }, [questionId]);

  var handleSubmit = () => {
    if (!answer.trim()) {
      setError('Answer field is required.');
      return;
    }

    setError('');
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO Answers (QuestionID, Answer) VALUES (?, ?)',
        [questionId, answer],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Answer added successfully.',
              [{ text: 'OK', onPress: () => navigation.goBack() }]
            );
            setAnswer('');
          } else {
            console.log('Answer could not be added.');
          }
        },
        (_, error) => {
          console.log('Error adding answer: ', error);
        },
      );
    });
  };

  return (
    <ScrollView style={styles.safeArea}>
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
            <Button title="Create Answer" onPress={handleSubmit} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AnswerCreateScreen;
