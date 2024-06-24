import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, Button, TouchableOpacity } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import db from '../database/db';
// Styles and Design
import { styles } from '../styles/styles';

var HomeScreen = () => {
  var [questions, setQuestions] = useState([]);
  var navigation = useNavigation();
  var isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) { // If the screen is in focus, load questions
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM Questions', [], (_, { rows }
        ) => {
          setQuestions(rows.raw());
        });
      });
    }
  }, [isFocused]); // Run effect when focus state changes

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <Text style={[styles.mainHeader, styles.textCenter]}>
          Welcome to <Text style={styles.primaryColor}>Think Positive</Text> App
        </Text>

        <Text style={[styles.mainSubHeader, styles.textCenter]}>
          The quality of your life directly depends on the quality of
          the questions you ask yourself.
        </Text>

        <View>
          {questions.map((item) => (
            <TouchableOpacity
              key={item.ID}
              style={styles.parrentBoxOfQuestion}
              onPress={() => navigation.navigate('Add Answer', { questionId: item.ID })}
            >
              <Text style={styles.questionTitle}>{item.Question}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.mbX2}>
          <Button
            title="Create New Question"
            onPress={() => navigation.navigate('Create Question')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
