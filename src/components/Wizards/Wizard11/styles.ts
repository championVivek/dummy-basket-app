import { StyleSheet } from 'react-native';
import Colors from '../../../common/Colors';
import fontFamily from '../../../common/fontFamily';

const styles = StyleSheet.create({
  text: {
    fontFamily: fontFamily['Roboto-Regular'],
    fontSize: 14,
    color: Colors[85858580]
  },
  textFieldContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 20,
  },
  lowerText: {
    fontFamily: fontFamily['Roboto-Regular'],
    fontSize: 12,
    color: Colors[85858580],
    paddingTop: 10
  }
});

export default styles;