import React from 'react';
import { Text } from 'react-native';
// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Screens
import HomeScreen from './src/screens/HomeScreen';
import QuestionCreateScreen from './src/screens/QuestionCreateScreen';
import QuestionUpdateScreen from './src/screens/QuestionUpdateScreen';
import AnswerCreateScreen from './src/screens/AnswerCreateScreen';
import AnswersScreen from './src/screens/AnswersScreen';
import AnswerUpdateScreen from './src/screens/AnswerUpdateScreen';
// Styles and Design
import { styles } from './src/styles/styles';
import IconPen from './assets/icons/pen.svg';
import IconCalendar3 from './assets/icons/calendar3.svg';

var Stack = createNativeStackNavigator();
var Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <IconPen
              width={styles.bottomNavigationIcon.width}
              height={styles.bottomNavigationIcon.height}
              fill={ focused ? styles.bottomNavigationActiveButton.color : styles.bottomNavigationButton.color }
            />
          ),
          tabBarLabelPosition: 'beside-icon',
          tabBarLabel: ({ focused }) => (
            <Text style={ focused ? styles.bottomNavigationActiveButton : styles.bottomNavigationButton } >
              My Questions
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Answers"
        component={AnswersScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <IconCalendar3
              width={styles.bottomNavigationIcon.width}
              height={styles.bottomNavigationIcon.height}
              fill={ focused ? styles.bottomNavigationActiveButton.color : styles.bottomNavigationButton.color }
            />
          ),
          tabBarLabelPosition: 'beside-icon',
          tabBarLabel: ({ focused }) => (
            <Text style={ focused ? styles.bottomNavigationActiveButton : styles.bottomNavigationButton } >
              My History
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main Tabs">
        <Stack.Screen
          name="Main Tabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="New Question"
          component={QuestionCreateScreen}
          options={{ headerBackTitle: 'Questions' }}
        />
        <Stack.Screen
          name="Edit Question"
          component={QuestionUpdateScreen}
          options={{ headerBackTitle: 'New Answer' }}
        />
        <Stack.Screen
          name="New Answer"
          component={AnswerCreateScreen}
          options={{ headerBackTitle: 'Questions' }}
        />
        <Stack.Screen
          name="Edit Answer"
          component={AnswerUpdateScreen}
          options={{ headerBackTitle: 'History' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
