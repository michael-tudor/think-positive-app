import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // Margin X1
  mt: { marginTop: 12 },
  mb: { marginBottom: 12 },
  my: { marginTop: 12, marginBottom: 12 },
  ml: { marginLeft: 12 },
  mr: { marginRight: 12 },
  mx: { marginLeft: 12, marginRight: 12 },
  m: { margin: 12 },
  // Margin X2
  mtX2: { marginTop: 24 },
  mbX2: { marginBottom: 24 },
  myX2: { marginTop: 24, marginBottom: 24 },
  mlX2: { marginLeft: 24 },
  mrX2: { marginRight: 24 },
  mxX2: { marginLeft: 24, marginRight: 24 },
  mX2: { margin: 24 },
  // Padding X1
  pt: { paddingTop: 12 },
  pb: { paddingBottom: 12 },
  py: { paddingTop: 12, paddingBottom: 12 },
  pl: { paddingLeft: 12 },
  pr: { paddingRight: 12 },
  px: { paddingLeft: 12, paddingRight: 12 },
  p: { padding: 12 },
  // Padding X2
  ptX2: { paddingTop: 24 },
  pbX2: { paddingBottom: 24 },
  pyX2: { paddingTop: 24, paddingBottom: 24 },
  plX2: { paddingLeft: 24 },
  prX2: { paddingRight: 24 },
  pxX2: { paddingLeft: 24, paddingRight: 24 },
  pX2: { padding: 24 },
  
  // Text Align
  textLeft: { textAlign: 'left' },
  textCenter: { textAlign: 'center' },
  textRight: { textAlign : 'right' },

  // Text Color
  colorWhite: { color: '#fff' },

  // Font
  fontBold: { fontWeight: 'bold' },

  // Flex
  flexDirectionRow: { flexDirection: 'row' },

  // General
  safeArea: {
    backgroundColor: '#f6f8fa',
    flex: 1,
  },

  primaryColor: {
    color: '#705bdd',
  },

  textInfo: {
    color: '#596589',
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: 0.4,
  },

  // Bottom Navigation
  bottomNavigationButton: {
    color: '#596589',
    paddingTop: 3,
    paddingLeft: 21,
  },

  bottomNavigationActiveButton: {
    color: '#705bdd',
    paddingTop: 3,
    paddingLeft: 21,
  },

  bottomNavigationIcon: {
    width: 24,
    height: 24,
  },

  // Questions Screen
  mainHeader: {
    paddingTop: 24,
    paddingBottom: 6,
    paddingLeft: 24,
    paddingRight: 24,
    color: '#2d3142',
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },

  mainSubHeader: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 24,
    paddingRight: 24,
    color: '#596589',
    fontSize: 20,
    lineHeight: 26,
    letterSpacing: 0.5,
  },

  parrentBoxOfQuestion: {
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 24,
    marginRight: 24,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10, // Shadow effect on iOS
    elevation: 10, // Shadow effect on Android
  },

  questionTitle: {
    color: '#333',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'bold',
    letterSpacing: 0.4,
  },

  // Forms
  formImput: {
    width: '100%',
    height: 40,
    marginTop: 12,
    marginBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 6,
  },

  formTextArea: {
    width: '100%',
    height: 100,
    marginTop: 12,
    marginBottom: 12,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 6,
  },

  questionFormContainer: {
    paddingTop: 12,
    paddingBottom: 24,
    paddingLeft: 24,
    paddingRight: 24,
  },

  // Answers Screen
  answerMonthDay: {
    backgroundColor: '#705bdd',
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10, // Shadow effect on iOS
    elevation: 10, // Shadow effect on Android
  },

  answerDayText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '300',
    marginBottom: -6,
    letterSpacing: 0.5,
  },

  answerMonthText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '300',
    letterSpacing: 0.5,
  },

  answerQuestion: {
    flexShrink: 1,
    color: '#333',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'bold',
    letterSpacing: 0.4,
  },

  answerText: {
    paddingTop: 4,
    color: '#333',
    fontSize: 16,
    lineHeight: 22,
  },
});
