import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import db from '../database/connect';
import { styles } from '../styles/styles';

var QuestionCreateScreen = () => {
  var [question, setQuestion] = useState('');
  var [purpose, setPurpose] = useState('');
  var [advice, setAdvice] = useState('');
  var [error, setError] = useState('');

  var navigation = useNavigation();

  var handleSubmit = () => {
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
        <Text style={styles.fontBold}>Question</Text>
        <Text style={styles.textInfo}>Ask yourself a question that will help you think positively.</Text>
        <TextInput
          style={[styles.formTextArea, styles.p]}
          multiline={true}
          value={question}
          onChangeText={setQuestion}
          placeholder="Question"
        />
        {error ? <Text style={{color: 'red'}}>{error}</Text> : null}

        <Text style={[styles.fontBold, styles.mt]}>Purpose</Text>
        <Text style={styles.textInfo}>Write down why you are asking yourself this question. This will help you maintain motivation to answer it in the future.</Text>
        <TextInput
          style={[styles.formTextArea, styles.p]}
          multiline={true}
          value={purpose}
          onChangeText={setPurpose}
          placeholder="Purpose"
        />

        <Text style={[styles.fontBold, styles.mt]}>Advice</Text>
        <Text style={styles.textInfo}>Give yourself advice or an example of what your answer should be.</Text>
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
