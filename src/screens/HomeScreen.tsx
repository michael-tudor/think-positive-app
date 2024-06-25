import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, Button, TouchableOpacity } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import db from '../database/connect';
// Styles and Design
import { styles } from '../styles/styles';
import IconPlusLg from '../../assets/icons/plus-lg.svg';
import IconCheck2Circle from '../../assets/icons/check2-circle.svg';

var HomeScreen = () => {
  var [questions, setQuestions] = useState([]);
  var navigation = useNavigation();
  var isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) { // If the screen is in focus, load questions
      db.transaction((tx) => {
        tx.executeSql(`
          SELECT Questions.*,
            CASE
              WHEN DATE(Answers.CreatedAt) = DATE('now') THEN true
              ELSE false
            END as AnsweredToday
          FROM Questions
          LEFT JOIN Answers ON Questions.ID = Answers.QuestionId
          AND DATE(Answers.CreatedAt) = DATE('now');
        `, [], (_, { rows }) => {
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
          {questions.map(
            (item) => item.AnsweredToday ? (
              <TouchableOpacity
                key={item.ID}
                style={[styles.questionDefaultItemBox, styles.questionDoneItem]}
                onPress={() => navigation.navigate('New Answer', { questionId: item.ID })}
              >
                <Text style={[styles.questionDefaultTitle, styles.questionDoneTitle]}>{item.Question}</Text>
                <IconCheck2Circle
                  width={styles.questionDefaultIcon.width}
                  height={styles.questionDefaultIcon.height}
                  style={styles.questionDefaultIcon}
                  fill={styles.questionDoneTitle.color}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                key={item.ID}
                style={styles.questionDefaultItemBox}
                onPress={() => navigation.navigate('New Answer', { questionId: item.ID })}
              >
                <Text style={styles.questionDefaultTitle}>{item.Question}</Text>
                <IconPlusLg
                  width={styles.questionDefaultIcon.width}
                  height={styles.questionDefaultIcon.height}
                  style={styles.questionDefaultIcon}
                />
              </TouchableOpacity>
            )
          )}
        </View>

        <View style={styles.mbX2}>
          <Button
            title="Create Question"
            onPress={() => navigation.navigate('New Question')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
