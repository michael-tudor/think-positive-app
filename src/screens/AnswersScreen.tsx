import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { format } from 'date-fns';
import db from '../database/connect';
// Styles and Design
import { styles } from '../styles/styles';

var AnswersScreen = () => {
  var [answers, setAnswers] = useState<{
    ID: number,
    CreatedAt: string,
    Question: string,
    Answer: string
  }[]>([]);
  var navigation = useNavigation();
  var isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      db.transaction((tx) => {
        tx.executeSql(
          `
            SELECT Answers.*, Questions.Question
            FROM Answers
            INNER JOIN Questions
            ON Answers.QuestionID = Questions.Id
            ORDER BY CreatedAt DESC
          `, [], (_, { rows }
        ) => {
          setAnswers(rows.raw());
        });
      });
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <Text style={[styles.mainHeader, styles.textCenter]}>
          History of Answers
        </Text>
        <View style={styles.ptX2}>
          {
            answers.length === 0 ? (
              <Text style={[styles.textCenter]}>Answers will be displayed here</Text>
            ) : (
              answers.map((item) => {
                var date = new Date(item.CreatedAt);
                var month = format(date, 'MMM');
                var day = format(date, 'dd');

                return (
                  <TouchableOpacity
                    key={item.ID}
                    style={styles.parrentBoxOfQuestion}
                    onPress={() => navigation.navigate('Edit Answer', { answerId: item.ID })}
                  >
                    <View style={{ flexDirection: 'row' }}>
                      <View style={[styles.pr, styles.mb]}>
                        <View style={styles.answerMonthDay}>
                          <Text style={styles.answerDayText}>{day}</Text>
                          <Text style={styles.answerMonthText}>{month}</Text>
                        </View>
                      </View>

                      <Text style={styles.answerQuestion}>{item.Question}</Text>
                    </View>
                    <Text style={styles.answerText}>{item.Answer}</Text>
                  </TouchableOpacity>
                );
              })
            )
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AnswersScreen;
