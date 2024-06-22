import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import db from '../database/db';
import { styles } from '../styles/styles';

const QuestionCreateScreen = () => {
  const [question, setQuestion] = useState('');
  const [purpose, setPurpose] = useState('');
  const [advice, setAdvice] = useState('');
  const [error, setError] = useState('');

  const navigation = useNavigation();

  const handleSubmit = () => {
    if (!question.trim()) {
      setError('Question field is required.');
      return;
    }

    setError('');
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO Questions (Question, Purpose, Advice) VALUES (?, ?, ?)',
        [question, purpose, advice],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Question added successfully.',
              [{ text: 'OK', onPress: () => navigation.goBack() }]
            );
            setQuestion('');
            setPurpose('');
            setAdvice('');
          } else {
            console.log('Question could not be added.');
          }
        },
        (_, error) => {
          console.log('Error adding question: ', error);
        },
      );
    });
  };

  return (
    <ScrollView style={styles.safeArea}>
      <View style={styles.questionFormContainer}>
        <TextInput
          style={[styles.formTextArea, styles.p]}
          multiline={true}
          value={question}
          onChangeText={setQuestion}
          placeholder="Question"
        />
        {error ? <Text style={{color: 'red'}}>{error}</Text> : null}
        <TextInput
          style={[styles.formTextArea, styles.p]}
          multiline={true}
          value={purpose}
          onChangeText={setPurpose}
          placeholder="Purpose"
        />
        <TextInput
          style={[styles.formTextArea, styles.p]}
          multiline={true}
          value={advice}
          onChangeText={setAdvice}
          placeholder="Advice"
        />
        <Button title="Create Question" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

export default QuestionCreateScreen;
