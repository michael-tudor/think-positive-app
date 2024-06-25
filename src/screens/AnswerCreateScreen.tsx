import React, { useState, useLayoutEffect, useCallback } from 'react';
import { ScrollView, View, Text, TextInput, Button, Alert } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { db, findRecordById } from '../database/utils';
import DeleteButton from '../components/DeleteButton';
// Styles and Design
import { styles } from '../styles/styles';

var AnswerCreateScreen = () => {
  var navigation = useNavigation();
  var route = useRoute();
  var { questionId } = route.params as { questionId: string };
  var [question, setQuestion] = useState('');
  var [purpose, setPurpose] = useState('');
  var [advice, setAdvice] = useState('');
  var [answer, setAnswer] = useState('');
  var [error, setError] = useState('');

  var fetchQuestionDetails = useCallback(() => {
    findRecordById('Questions', questionId).then((record) => {
      if (record) {
        setQuestion(record.Question);
        setPurpose(record.Purpose);
        setAdvice(record.Advice);
      }
    });
  }, [questionId]);

  useFocusEffect(
    useCallback(() => {
      fetchQuestionDetails();
    }, [fetchQuestionDetails])
  );

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
        (_: any, { rowsAffected }: any) => {
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
        (_: any, error: any) => {
          console.log('Error adding answer: ', error);
        },
      );
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <DeleteButton
          recordId={questionId}
          tableName="Questions"
          checkDependencies={true}
        />
      ),
    });
  }, [navigation]);

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
          <View style={styles.my}>
            <Button title="Create Answer" onPress={handleSubmit} />
          </View>
          <View style={styles.my}>
            <Button
              title="Edit Question"
              onPress={() => navigation.navigate('Edit Question', { questionId: questionId })}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AnswerCreateScreen;
