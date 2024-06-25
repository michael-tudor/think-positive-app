import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, Button, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { findRecordById, updateRecord } from '../database/utils';
import { styles } from '../styles/styles';

var QuestionUpdateScreen = () => {
  var navigation = useNavigation();
  var route = useRoute();
  var { questionId } = route.params as { questionId: string };

  var [question, setQuestion] = useState('');
  var [purpose, setPurpose] = useState('');
  var [advice, setAdvice] = useState('');
  var [error, setError] = useState('');

  useEffect(() => {
    findRecordById('Questions', questionId).then((
      record: {
        Question: string,
        Purpose: string,
        Advice: string
      } | null
    ) => {
      if (record) {
        setQuestion(record.Question);
        setPurpose(record.Purpose);
        setAdvice(record.Advice);
      }
    });
  }, []);

  var handleSubmit = () => {
    if (!question.trim()) {
      setError('Question field is required.');
      return;
    }

    setError('');
    updateRecord('Questions', {
      Question: question,
      Purpose: purpose,
      Advice: advice
    }, questionId).then(() => {
      Alert.alert(
        'Success',
        'Question updated successfully.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    }).catch((error) => {
      console.log('Error updating question: ', error);
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
        <Button title="Update Question" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

export default QuestionUpdateScreen;
