import {StyleSheet} from 'react-native';
import fontFamily from '../../common/fontFamily';

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centerText: {
    color: '#394951',
    fontSize: 18,
    fontFamily: fontFamily['Roboto-Medium'],
  },
});

export default styles;
