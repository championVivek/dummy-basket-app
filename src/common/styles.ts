import { StyleSheet } from 'react-native';
import Colors from './Colors';
import fontFamily from './fontFamily';

const commonStyles = StyleSheet.create({
  authTitle: {
    color: Colors.fontColor,
    fontSize: 32,
    paddingBottom: 10,
    fontFamily: fontFamily['Roboto-Bold'],
  },
  title: {
    color: Colors.fontColor,
    fontSize: 32,
    paddingBottom: 10,
    fontFamily: fontFamily['Roboto-Bold'],
  },
  selectOneText: {
    color: Colors.selectColor,
    fontFamily: fontFamily['Roboto-Bold'],
    fontSize: 16,
    paddingBottom: 20
  },
  errorText: {
    color: Colors.errorColor,
    fontFamily: fontFamily['Roboto-Regular'],
    fontSize: 16,
  }
});

export default commonStyles;
