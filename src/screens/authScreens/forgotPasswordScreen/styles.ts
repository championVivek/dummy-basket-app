import { StyleSheet } from 'react-native';
import Colors from '../../../common/Colors';
import fontFamily from '../../../common/fontFamily';

const styles = StyleSheet.create({
  title: {
    color: Colors.fontColor,
    fontSize: 32,
    paddingBottom: 10,
    fontFamily: fontFamily['Roboto-Bold'],
  },
  text: {
    color: Colors.lineColor,
    fontFamily: fontFamily['Roboto-Regular'],
    fontSize: 14,
    paddingTop: 10,
    paddingBottom: 15,
  },
  btnContainer: {
    marginTop: 20,
  },
});

export default styles;
